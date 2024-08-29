// import React from "react";

// const TestPage = () => {
//   return (
//     <div>
//       <div className="font-sans max-w-2xl mx-auto p-4">
//         <div className="bg-zinc-950 text-white text-center p-6 rounded-t-lg">
//           <h1 className="text-3xl font-bold">Order Confirmation</h1>
//         </div>
//         <div className="bg-gray-100 p-6 rounded-b-lg">
//           <p className="mb-4">Dear {customerName},</p>
//           <p className="mb-4">
//             Thank you for your order. We're pleased to confirm that we've
//             received your order and it's being processed.
//           </p>
//           <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
//             <h2 className="text-xl font-semibold mb-4">Order Details</h2>
//             <p className="mb-2">
//               <strong>Order Number:</strong> {orderNumber}
//             </p>
//             <p className="mb-4">
//               <strong>Order Date:</strong> {orderDate}
//             </p>
//             <table className="w-full mb-4">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left p-2">Item</th>
//                   <th className="text-left p-2">Quantity</th>
//                   <th className="text-left p-2">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, index) => ( 
//                   <tr key={index} className="border-b">
//                     <td className="p-2">{item.name}</td>
//                     <td className="p-2">{item.quantity}</td>
//                     <td className="p-2">${item.price.toFixed(2)}</td>
//                   </tr> 
//                  ))}
//               </tbody>
//             </table>
//             <p className="font-semibold">Total: ${"totalAmount.toFixed(2)"}</p>
//           </div>
//           <p className="mb-4">
//             We'll send you another email when your order has been shipped.
//           </p>
//           <p>If you have any questions, please don't hesitate to contact us.</p>
//         </div>
//         <div className="text-center text-sm text-gray-500 mt-6">
//           <p>&copy; 2024 Amo.arte. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestPage;
