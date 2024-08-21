import React from "react";
import ProductForm from "../_components/ProductForm";
import AdminPageHeader from "@/app/admin/_components/AdminPageHeader";


const AddNewProduct = () => {
  return (
    <div
      className="min-h-svh flex flex-col
     gap-6 pt-20"
    >
     <div className="w-full md:w-3/5 flex lg:justify-center">
     <AdminPageHeader title={"Add Product"} />
     </div>
      <div className="w-full flex justify-center ">
        <ProductForm />
      </div>
    </div>
  );
};

export default AddNewProduct;
