'use client'
import AdminPageHeader from "@/app/admin/_components/AdminPageHeader";
import ProductForm from "../../_components/ProductForm";
import { useEditProductMutation, useGetProductByIdQuery } from "@/_redux/services/productApi";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const UpdateProduct = ({params: {id}}:{ params: {id: string}}) => {
    const{data, error, isSuccess, isLoading} = useGetProductByIdQuery(id)
   
    useEffect(() => {
      
    }, [data])
   
    return (
      <div
        className="min-h-svh flex flex-col
       gap-6 pt-20"
      >
       <div className="w-full md:w-3/5 flex lg:justify-center">
       <AdminPageHeader title={"Edit Product"} />
       </div>
        <div className="w-full flex justify-center ">
           {isLoading && <Loader2 size={24} className="animate-spin" />}
           {error && <div>Opps...Something went wrong!</div>}
           { isSuccess &&  !error && <ProductForm product={data}/>}
        </div>
      </div>
    );
  };
  
  export default UpdateProduct;