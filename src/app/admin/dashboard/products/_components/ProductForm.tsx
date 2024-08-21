"use client";
import { addProduct, updateProduct } from "@/app/admin/_actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";

import React, { useState } from "react";

import { useFormStatus, useFormState } from "react-dom";
import { formatCurrency } from "../../../../../../utils/formatters";
import { useRouter } from "next/navigation";


const ProductForm = ({ product }: { product?: any }) => {
 
  const [error, action] = useFormState(
    product ? updateProduct.bind(null, product._id) : addProduct,
    {}
  );
  const [price, setPrice] = useState<number | undefined>(product?.price || 0);
  const [quantity, setQuantity] = useState<number | undefined>(
    product?.quantity || 0
  );
  const [preview, setPreview] = useState(product?.image?.base64 || null);
 
  const handleFileInputChange = (e: any) => {
    previewFile(e?.target.files[0]! );
  };

  const previewFile = (item: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(item);
    reader.onload = () => {
      setPreview(reader.result as any);
    };
  };

  const handleSetPriceOnChange = (e: any) => {
    setPrice(Number(e.target.value));
  };



  return (
    <form className="space-y-3" action={action}>
      <div className="flex gap-2 ">
        <div className="">
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            required
            defaultValue={product?.name}
          ></Input>
        </div>
        <div>
          <div className="">
            <Label htmlFor="price">Item Quantity</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity?.toString()}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            ></Input>
          </div>
          {error && <p className="text-xs mt-1 text-red-500">{error.price}</p>}
        </div>
      </div>
      <div>
        <div className="">
          <Label htmlFor="quantity">Product Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={price?.toString()}
            onChange={handleSetPriceOnChange}
            required
          ></Input>
        </div>
        <p className="text-xs mt-1 text-muted-foreground">
          {formatCurrency((price || 0) / 100)}
        </p>
        {error && <p className="text-xs mt-1 text-red-500">{error.price}</p>}
      </div>

      <div className="">
        <Label htmlFor="description">Product Descrition</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter product Description"
          required
          defaultValue={product?.description}
        ></Textarea>
      </div>
      <div>
        <div>
          <Label htmlFor="image">Add Product Image</Label>
          <Input
            type="file"
            name="image"
            id="image"
            placeholder="Add product image"
            required={!product && true}
            onChange={handleFileInputChange}
          />
        </div>
        {preview && (
          <div className="mt-2 flex justify-center">
            <Image
              src={preview || ""}
              width={150}
              height={150}
              alt="show"
            />
          </div>
        )}
      </div>
      <SaveBtn p={product} />
    </form>
  );
};

export default ProductForm;

const SaveBtn = ({ p }: { p?: any }) => {
  const { pending } = useFormStatus();
  const router = useRouter()
  return (
    <Button type="submit" disabled={pending} onClick={() => router.replace('/admin/dashboard')}>
      {pending ? "Saving" : p?._id ? "Update" : "Save"}
    </Button>
  );
};
