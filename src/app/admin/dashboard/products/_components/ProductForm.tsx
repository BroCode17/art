// "use client";
// import { addProduct, updateProduct } from "@/app/admin/_actions/product";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@radix-ui/react-label";
// import Image from "next/image";

// import React, { useEffect, useState } from "react";

// import { useFormStatus, useFormState } from "react-dom";
// import { formatCurrency } from "../../../../../../utils/formatters";
// import { useRouter } from "next/navigation";

// const ProductForm = ({ product }: { product?: any }) => {
//   const [error, action] = useFormState(
//     product ? updateProduct.bind(null, product._id) : addProduct,
//     {}
//   );
//   const [price, setPrice] = useState<number | undefined>(product?.price || 0);
//   const [quantity, setQuantity] = useState<number | undefined>(
//     product?.quantity || 0
//   );
//   const [preview, setPreview] = useState(product?.image?.base64 || null);
//   const [varient, setVarient] = useState<any[]>([
//     {
//       tag: {
//         tagName: "Original",
//         tagPrice: 0.0,
//       },
//     },
//   ]);

//   useEffect(() => {}, [varient]);

//   const handleFileInputChange = (e: any) => {
//     previewFile(e?.target.files[0]!);
//   };

//   const previewFile = (item: any) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(item);
//     reader.onload = () => {
//       setPreview(reader.result as any);
//     };
//   };

//   const handleSetPriceOnChange = (e: any) => {
//     setPrice(Number(e.target.value));
//   };

//   const handleTagChange = async (tagName: string, index: number) => {
//     //   //   const imageToUpdate = images.find((image: LayoutImageProps) => image._id === id);
//     //   //   if (imageToUpdate) {
//     //   //     const updatedTags = imageToUpdate.tags.includes(tag)
//     //   //       ? imageToUpdate.tags.filter((t:any) => t !== tag)
//     //   //       : [...imageToUpdate.tags, tag];

//     //   //     await updateImage({ id, tags: updatedTags });
//     //   //     refetch();
//     //   //   }

    

//     // varient.map((item) => console.log(item.tag.tagName.includes(tagName)))
//   };

//   return (
//     <form className="space-y-3" action={action}>
//       <div className="flex gap-2 ">
//         <div className="">
//           <Label htmlFor="name">Product Name</Label>
//           <Input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter product name"
//             required
//             defaultValue={product?.name}
//           ></Input>
//         </div>
//         <div>
//           <div className="">
//             <Label htmlFor="price">Item Quantity</Label>
//             <Input
//               type="number"
//               id="quantity"
//               name="quantity"
//               value={quantity?.toString()}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               required
//             ></Input>
//           </div>
//           {error && <p className="text-xs mt-1 text-red-500">{error.price}</p>}
//         </div>
//       </div>

//       <div className="space-y-2">
//         <div className="flex flex-wrap space-x-4">
//           {["Original", "12 X 16", "16 X 20", "18 X 24"].map((tag, index) => (
//             <label key={tag} className="flex items-center space-x-2 containa ">
//               <input
//                 type="checkbox"
//                 checked={varient[index].tag.tagName.includes(tag)}
//                 onChange={() => handleTagChange(tag, index)}
//                 className="form-checkbox h-5 w-5 bg-black text-yellow-700 checkmark"
//               />
//               <span>{tag}</span>
//             </label>
//           ))}
//         </div>
//         {/* <div>
//           {varient.map((tag) => (
//             <>
//               <div className="mt-2">
//                 <Label htmlFor="quantity">{tag} Price</Label>
//                 <Input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={price?.toString()}
//                   onChange={handleSetPriceOnChange}
//                   required
//                 ></Input>
//               </div>
//               <p className="text-xs mt-1 text-muted-foreground">
//                 {formatCurrency((price || 0) / 100)}
//               </p>
//               {error && (
//                 <p className="text-xs mt-1 text-red-500">{error.price}</p>
//               )}
//             </>
//           ))}
//         </div> */}
//       </div>

//       <div className="">
//         <Label htmlFor="description">Product Descrition</Label>
//         <Textarea
//           id="description"
//           name="description"
//           placeholder="Enter product Description"
//           required
//           defaultValue={product?.description}
//         ></Textarea>
//       </div>

//       <div>
//         <div>
//           <Label htmlFor="image">Add Product Image</Label>
//           <Input
//             type="file"
//             name="image"
//             id="image"
//             placeholder="Add product image"
//             required={!product && true}
//             onChange={handleFileInputChange}
//           />
//         </div>
//         {preview && (
//           <div className="mt-2 flex justify-center">
//             <Image src={preview || ""} width={150} height={150} alt="show" />
//           </div>
//         )}
//       </div>
//       <SaveBtn p={product} />
//     </form>
//   );
// };

// export default ProductForm;

// const SaveBtn = ({ p }: { p?: any }) => {
//   const { pending } = useFormStatus();
//   const router = useRouter();
//   return (
//     <Button
//       type="submit"
//       disabled={pending}
//       onClick={() => router.replace("/admin/dashboard")}
//     >
//       {pending ? "Saving" : p?._id ? "Update" : "Save"}
//     </Button>
//   );
// };
