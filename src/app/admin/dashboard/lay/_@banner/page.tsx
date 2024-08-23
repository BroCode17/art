// 'use client'
// import React, { useState } from 'react';
// import { useGetImagesQuery, useAddImageMutation, useUpdateImageMutation, useDeleteImageMutation } from "@/_redux/services/imageApi";

// const CarouselAdmin = () => {
//     const { data: images = [], refetch } = useGetImagesQuery('');
//     const [addImage] = useAddImageMutation();
//     const [updateImage] = useUpdateImageMutation();
//     const [deleteImage] = useDeleteImageMutation();
//     const [pendingImages, setPendingImages] = useState([]);
    
//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const base64Image = reader.result;

//                 const newImage = {
//                     id: images.length + pendingImages.length + 1,
//                     src: base64Image,
//                     alt: `Image ${images.length + pendingImages.length + 1}`,
//                     tags: []
//                 };

//                 setPendingImages([...pendingImages, newImage]);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSaveImages = async () => {
//         for (const image of pendingImages) {
//             await addImage(image);
//         }
//         setPendingImages([]);
//         refetch();
//     };

//     const handleDeletePendingImage = (id) => {
//         setPendingImages(pendingImages.filter(image => image.id !== id));
//     };

//     const handleAltChange = (id, newAlt, isPending = false) => {
//         if (isPending) {
//             setPendingImages(pendingImages.map(img => img.id === id ? { ...img, alt: newAlt } : img));
//         } else {
//             const imageToUpdate = images.find(image => image.id === id);
//             if (imageToUpdate) {
//                 updateImage({ id, ...imageToUpdate, alt: newAlt });
//                 refetch();
//             }
//         }
//     };

//     const handleTagChange = (id, tag, isPending = false) => {
//         if (isPending) {
//             setPendingImages(pendingImages.map(image =>
//                 image.id === id
//                     ? { ...image, tags: image.tags.includes(tag) ? image.tags.filter(t => t !== tag) : [...image.tags, tag] }
//                     : image
//             ));
//         } else {
//             const imageToUpdate = images.find(image => image.id === id);
//             if (imageToUpdate) {
//                 const updatedTags = imageToUpdate.tags.includes(tag)
//                     ? imageToUpdate.tags.filter(t => t !== tag)
//                     : [...imageToUpdate.tags, tag];
//                 updateImage({ id, ...imageToUpdate, tags: updatedTags });
//                 refetch();
//             }
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-3xl font-bold mb-6">Carousel Image Management</h1>
            
//             {/* Upload Section */}
//             <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//                 <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
//                 <form className="space-y-4">
//                     <div>
//                         <label className="block text-lg font-medium text-gray-700">Select Image:</label>
//                         <input 
//                             type="file" 
//                             accept="image/*" 
//                             onChange={handleImageUpload}
//                             className="mt-2 block w-full p-2 border border-gray-300 rounded-md" 
//                         />
//                     </div>
//                 </form>
//             </div>

//             {/* Pending Save Section */}
//             {pendingImages.length > 0 && (
//                 <div className="bg-yellow-100 p-6 rounded-lg shadow-lg mb-8">
//                     <h2 className="text-2xl font-semibold mb-4">Pending Images</h2>
//                     <ul className="space-y-4">
//                         {pendingImages.map(image => (
//                             <li key={image.id} className="flex flex-col space-y-4">
//                                 <div className="flex items-center space-x-4">
//                                     <img src={image.src} alt={image.alt} className="w-24 h-24 object-cover rounded-md" />
//                                     <input 
//                                         type="text" 
//                                         value={image.alt} 
//                                         onChange={(e) => handleAltChange(image.id, e.target.value, true)} 
//                                         className="w-full p-2 border border-gray-300 rounded-md" 
//                                     />
//                                     <button 
//                                         type="button" 
//                                         onClick={() => handleDeletePendingImage(image.id)} 
//                                         className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                                 <div className="flex flex-wrap space-x-4">
//                                     {['Home', 'Banner', 'Products', 'Footer'].map(tag => (
//                                         <label key={tag} className="flex items-center space-x-2">
//                                             <input 
//                                                 type="checkbox" 
//                                                 checked={image.tags.includes(tag)} 
//                                                 onChange={() => handleTagChange(image.id, tag, true)}
//                                                 className="form-checkbox h-5 w-5 text-blue-600"
//                                             />
//                                             <span>{tag}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     <button 
//                         type="button" 
//                         onClick={handleSaveImages} 
//                         className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                     >
//                         Save All Images
//                     </button>
//                 </div>
//             )}

//             {/* Edit Section */}
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4">Edit Existing Images</h2>
//                 <ul className="space-y-4">
//                     {images.map(image => (
//                         <li key={image.id} className="flex flex-col space-y-4">
//                             <div className="flex items-center space-x-4">
//                                 <img src={image.src} alt={image.alt} className="w-24 h-24 object-cover rounded-md" />
//                                 <input 
//                                     type="text" 
//                                     value={image.alt} 
//                                     onChange={(e) => handleAltChange(image.id, e.target.value)} 
//                                     className="w-full p-2 border border-gray-300 rounded-md" 
//                                 />
//                                 <button 
//                                     type="button" 
//                                     onClick={() => handleDeleteImage(image.id)} 
//                                     className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                             <div className="flex flex-wrap space-x-4">
//                                 {['Home', 'Banner', 'Products', 'Footer'].map(tag => (
//                                     <label key={tag} className="flex items-center space-x-2">
//                                         <input 
//                                             type="checkbox" 
//                                             checked={image.tags.includes(tag)} 
//                                             onChange={() => handleTagChange(image.id, tag)}
//                                             className="form-checkbox h-5 w-5 text-blue-600"
//                                         />
//                                         <span>{tag}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default CarouselAdmin;

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page