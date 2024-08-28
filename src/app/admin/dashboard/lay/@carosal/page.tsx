"use client";
import "./custom.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  useGetImagesQuery,
  useAddImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} from "@/_redux/services/imageApi";
import { useToast } from "@/app/shop/_components/toast-context";
import { CldImage } from "next-cloudinary";
import { Loader2 } from "lucide-react";

type ImageProps = {
  src: string | ArrayBuffer; // The base64-encoded image string
  alt: string;
  tags: Array<string>;
};

type LayoutImage = {
  public_src: string;
  url: string;
  _id: string;
};

type LayoutImageProps = {
  _id: string;
  src: string;
  alt: string;
  tags: Array<string>;
  image: LayoutImage;
  createdAt: Date;
  updatedAt: Date;
};

type FindObjectToUpdateProps = {
  imageToUpdate: LayoutImage;
  imageToUpdateIndex: number;
};

const CarouselAdmin = () => {
  const { data: imagess = [], refetch, isSuccess } = useGetImagesQuery("");
  const [addImage, { isLoading: addImageIsLoading }] = useAddImageMutation();
  const [updateImage, { isLoading: updateImageIsLoading }] =
    useUpdateImageMutation();
  const [deleteImage, { isLoading: deleteImageIsLoading }] =
    useDeleteImageMutation();
  const [saveImage, setSaveImage] = useState<ImageProps>();
  const [showError, setShowError] = useState("");
  const toast = useToast();
  const [updatedImages, setUpdatedImages] = useState<
    LayoutImageProps | never | any
  >([]);
  const [images, setImages] = useState<LayoutImageProps | never | any>([]);

  useEffect(() => {
    if (isSuccess) {
      setImages(imagess.response);
    }
  }, [imagess]);

  useEffect(() => {}, [images]);

  const handleSaveAll = async () => {
    // Bulk update images that have been edited
    if (updatedImages.length > 0) {
      const res = await updateImage(updatedImages);
      if (res.data) {
        toast?.open(res.data.message);
      }
    }
    // Clear local states and refetch data
    setUpdatedImages([]);
    refetch();
  };

  const handleImageUpload = async () => {
    if (saveImage) {
      try {
        const res:any = await addImage(saveImage);
        console.log(res);
        if (res.error) {
          console.log(res.error.data.message);
        } else {
          toast?.open(res.data.message);
        }
        refetch();
      } catch (error) {
        console.log(error);
      }
    }
    setSaveImage(undefined);
  };

  const handleAddImage = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        const newImage: any = {
          src: base64Image, // The base64-encoded image string
          alt: file.name,
          tags: [],
        };

        setSaveImage(newImage);
      };
      reader.readAsDataURL(file); // Convert the image file to base64
    }
  };

  const handleDeleteImage = async (id: string) => {
    await deleteImage(id);
    refetch();
  };

  const handleAltChange = async (id:any, newAlt:any) => {
    const imageToUpdate = images.find((image:LayoutImageProps) => image._id === id);
    if (imageToUpdate) {
      await updateImage({ id, ...imageToUpdate, alt: newAlt });
      refetch();
    }
  };

  const findObjectWithIndex = (id: string) => {
    const imageToUpdateIndex = images.findIndex(
      (image: LayoutImageProps) => image._id === id
    );
    if (imageToUpdateIndex != -1) {
      return {
        imageToUpdateIndex,
        imageToUpdate: images[imageToUpdateIndex],
      } as FindObjectToUpdateProps;
    }
    return null;
  };

  const handleTagChange = async (id: string, tag: string) => {
    //   //   const imageToUpdate = images.find((image: LayoutImageProps) => image._id === id);
    //   //   if (imageToUpdate) {
    //   //     const updatedTags = imageToUpdate.tags.includes(tag)
    //   //       ? imageToUpdate.tags.filter((t:any) => t !== tag)
    //   //       : [...imageToUpdate.tags, tag];

    //   //     await updateImage({ id, tags: updatedTags });
    //   //     refetch();
    //   //   }

    const result: FindObjectToUpdateProps | any | null = findObjectWithIndex(id);

    if (result) {
      const updatedTags = result.imageToUpdate.tags.includes(tag)
        ? result.imageToUpdate.tags.filter((t:any) => t !== tag)
        : [...result.imageToUpdate.tags, tag];

      const updatedImage = { ...result.imageToUpdate.tags, tags: updatedTags };

      //update images array in real time
      setImages((prevItems: [LayoutImageProps]) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, tags: updatedTags } : item
        )
      );

      // // Update the local state with the updated image
      setUpdatedImages((prev: any) => {
        const existingObj = prev.find(
          (img: LayoutImageProps) => img._id === id
        );
        if (existingObj) {
          existingObj.tags = [...updatedTags];

          const newUpdateObject = prev.filter((p: any) => p._id !== id);
          return [...newUpdateObject, existingObj];
        }
        return prev.push({ _id: id, ...updatedImage });
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carousel Image Management</h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Select Image:
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                className="block w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="button"
                onClick={handleImageUpload}
                className={`${
                  !saveImage ? "bg-zinc-700" : "bg-zinc-950"
                } text-white h-12 w-1/5 px-4 rounded-md hover:bg-zinc-700 flex justify-center items-center`}
                disabled={!saveImage}
              >
                {addImageIsLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Edit Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">Edit Existing Images</h2>
          {images.length > 0 && (
            <button
              type="button"
              onClick={handleSaveAll}
              className={`${
                updatedImages.length === 0 ? "bg-zinc-700" : "bg-zinc-950"
              } text-white h-12 w-[110px] px-4 rounded-md hover:bg-zinc-700 flex justify-center items-center`}
              disabled={updatedImages.length === 0}
            >
              {updateImageIsLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          )}
        </div>
        <ul className="space-y-4 max-h-96 overflow-y-scroll mt-4">
          {images.map((image: LayoutImageProps) => (
            <li key={image._id} className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <CldImage
                  src={image.image.public_src}
                  alt={image.alt}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-fill rounded-md"
                />
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) => handleAltChange(image._id, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  key={image._id}
                  onClick={() => handleDeleteImage(image._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-wrap space-x-4">
                {["Banner", "Caro 1", "Caro 2", "RTA"].map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center space-x-2 containa "
                  >
                    <input
                      type="checkbox"
                      checked={image.tags.includes(tag)}
                      onChange={() => handleTagChange(image._id, tag)}
                      className="form-checkbox h-5 w-5 bg-black text-yellow-700 checkmark"
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarouselAdmin;

// const CarouselAdmin = () => {
//   const { data: imagess = [], refetch, isSuccess } = useGetImagesQuery('');
//   const [addImage] = useAddImageMutation();
//   const [updateImages] = useUpdateImageMutation();
//   const [pendingImages, setPendingImages] = useState([]);
//   const [updatedImages, setUpdatedImages] = useState<LayoutImageProps | never | any>([]);
//   const [images, setImages] = useState<LayoutImageProps | never | any>([]);

//     useEffect(() => {
//     if (isSuccess) {
//       setImages(imagess.response);
//     }
//   }, [imagess]);

//   const handleTagChange = (id:string, tag:string, isPending = false) => {
//       // if (isPending) {
//       //     setPendingImages(pendingImages.map(image =>
//       //         image.id === id
//       //             ? { ...image, tags: image.tags.includes(tag) ? image.tags.filter(t => t !== tag) : [...image.tags, tag] }
//       //             : image
//       //     ));
//       // } else {

//          const  result: FindObjectToUpdateProps | null = findObjectWithIndex(id)

//           if (result) {
//               const updatedTags = result.imageToUpdate.tags.includes(tag)
//                   ? result.imageToUpdate.tags.filter(t => t !== tag)
//                   : [...result.imageToUpdate.tags, tag];

//               const updatedImage = { ...result.imageToUpdate.tags, tags: updatedTags };

//               //update images array in real time
//               setImages((prevItems:[LayoutImageProps]) =>
//                 prevItems.map(item =>item._id === id ? { ...item, tags: updatedTags } : item
//               ))

//               // // Update the local state with the updated image
//               setUpdatedImages((prev: any) => {
//                   const existingIndex = prev.findIndex((img:LayoutImageProps) => img._id === id);
//                   if (existingIndex !== -1) {
//                       const updatedArray = [...prev];
//                       updatedArray[existingIndex] = updatedImage;
//                       return updatedArray;
//                   }
//                   return [...prev, updatedImage];
//               });
//           //}
//       }
//   };

//   const handleSaveAll = async () => {
//       // Save pending images first
//       for (const image of pendingImages) {
//           await addImage(image);
//       }

//       // Bulk update images that have been edited
//       if (updatedImages.length > 0) {
//           await updateImages(updatedImages);
//       }

//       // Clear local states and refetch data
//       setPendingImages([]);
//       setUpdatedImages([]);
//       refetch();
//   };

//    console.log(updatedImages)
//   return (
//       <div className="container mx-auto p-6">
//           <h1 className="text-3xl font-bold mb-6">Carousel Image Management</h1>

//           {/* Save Button */}
//           <button
//               type="button"
//               onClick={handleSaveAll}
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-6"
//           >
//               Save All Changes
//           </button>

//           {/* Image List (Example UI) */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {images.map((image: LayoutImageProps) => (
//                   <div key={image._id} className="relative">
//                       <CldImage src={image.image.public_src} alt={image.alt} className="w-full h-48 object-cover rounded-md"  height={96} width={96}/>
//                       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2">
//                           {['Home', 'Banner', 'Products', 'Footer'].map(tag => (
//                               <button
//                                   key={tag}
//                                   className={`px-4 py-2 rounded-full text-sm ${
//                                       image.tags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-200'
//                                   }`}
//                                   onClick={() => handleTagChange(image._id, tag)}
//                               >
//                                   {tag}
//                               </button>
//                           ))}
//                       </div>
//                   </div>
//               ))}
//           </div>

//           {/* Pending Images (Example UI) */}
//           <div className="mt-6">
//               <h2 className="text-2xl font-bold mb-4">Pending Images</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {pendingImages.map((image) => (
//                       <div key={image.id} className="relative">
//                           <CldImage src={image.src} alt={image.alt} className="w-full h-48 object-cover rounded-md" width={96} height={96} />
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2">
//                               {['Home', 'Banner', 'Products', 'Footer'].map(tag => (
//                                   <button
//                                       key={tag}
//                                       className={`px-4 py-2 rounded-full text-sm ${
//                                           image.tags.includes(tag) ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-200'
//                                       }`}
//                                       onClick={() => handleTagChange(image.id, tag, true)}
//                                   >
//                                       {tag}
//                                   </button>
//                               ))}
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//       </div>
//   );
// };

// export default CarouselAdmin
