"use server ";

import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { useEditProductMutation } from "@/_redux/services/productApi";
import { EditProductProps } from "@/types";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().int().min(1),
  image: fileSchema.refine((file) => file.size > 0, "Required"),
  quantity: z.coerce.number().int().min(1),
});

export const editSchema = addSchema.extend({
  image: fileSchema.optional(),
});

interface Data {
  name: string;
  quantity: number;
  price: number;
  description: string;
  image: File;
}

export async function addProduct(prevState: unknown, formDate: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formDate.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data: Data = result.data;
  //manipulate file data
  const reader = new FileReader();
  reader.readAsDataURL(data.image);

  reader.onload = () => {
    uploader(reader.result as any, data);
  };

  //Save to dp
  redirect("/admin/dashboard");
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formDate: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formDate.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  if (data.image?.name === "") {
    updateWithImgag(data as any, id);
  }

  const reader = new FileReader();
  reader.readAsDataURL(data.image!);

  reader.onload = () => {
    uploader(reader.result as any, data);
  };
}

export const uploader = async (
  base64ImageUrl: Blob,
  allData: any,
  id?: string
) => {
  //call to backend
  console.log(allData.image.name);
  const dataToBeSend: EditProductProps = {
    name: allData.name,
    quantity: allData.quantity,
    price: allData.price,
    description: allData.description,
    image: base64ImageUrl,
  };
  try {
    await fetch(
      `http://localhost:5050/api/v1/products/${id ? "product/" + id : "add"}`,
      {
        method: `${id ? "PUT" : "POST"}`,
        body: JSON.stringify({ data: dataToBeSend }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  } catch (error) {
    //Fix error next time
    return error;
  }
};

const updateWithImgag = async (allData: Data, id: string) => {
  const dataToBeSend: EditProductProps = {
    name: allData.name,
    quantity: allData.quantity,
    price: allData.price,
    description: allData.description,
  };

  try {
    dataToBeSend.id = id;
    await fetch(`http://localhost:5050/api/v1/products/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data: dataToBeSend }),
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    return error
  }
};
