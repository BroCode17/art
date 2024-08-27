import React from "react";
import AdminPageHeader from "@/app/admin/_components/AdminPageHeader";
import ProductFormTwo from '@/app/admin/dashboard/products/_components/ProductFormTwo'


const AddNewProduct = () => {
  return (
    <div
      className="min-h-svh flex flex-col
     gap-6 pt-20" 
    >
     <div className="w-full md:w-3/5 flex lg:justify-center">
     <AdminPageHeader title={"Add Product"} />
     </div>
      {/* <div className="w-full flex justify-center h-full overflow-y-scroll"> */}
        <ProductFormTwo />
      
      {/* </div> */}
    </div>
   

  );
};

export default AddNewProduct;
