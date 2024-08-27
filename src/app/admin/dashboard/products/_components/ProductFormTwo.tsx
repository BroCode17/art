"use client";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetAllProductQuery,
} from "@/_redux/services/productApi";
import { useToast } from "@/app/shop/_components/toast-context";
import ImageWithSkeleton from "@/components/_images/ImageWithSkeleton";

// import { addProduct, updateProduct } from "@/app/admin/_actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { useState } from "react";
import {  useFormStatus } from "react-dom";

type Variant = {
  id: number;
  name: string;
  price: number | null;
};

type Product = {
  name: string;
  variants: Variant[];
  quantity: number | undefined;
  description: string | undefined;
  image: string | null;
};

type FormErrorsType = {
  productName: { error: boolean; message: string };
  itemQuantity: { error: boolean; message: string };
  varientNames: Map<number, string>;
  description: { error: boolean; message: string };
  image: { error: boolean; message: string };
};

const initVariant = {
  id: Date.now(),
  name: "Original",
  price: null,
};

const availableVariants = ["Original", "12 X 16", "16 X 20", "18 X 24"];

// Save Button
// const SaveBtn = ({ p }: { p?: any }) => {
//   const { refetch } = useGetAllProductQuery("");
//   const { pending } = useFormStatus();
//   const router = useRouter();
//   return (
//     <Button
//       type="submit"
//       disabled={pending}
//       onClick={() => {
//         //REFETCH DATA HERE!
//         refetch(); //refetch data from backend
//         //router.replace("/admin/dashboard");
//       }}
//       className="w-full"
//     >
//       {pending ? "Saving" : p?._id ? "Update" : "Save"}
//     </Button>
//   );
// };

const ProductFormTwo = ({ product }: { product?: any }) => {
  //BINDING
  //   const [error, action] = useFormState(
  //     product ? updateProduct.bind(null, product._id) : addProduct,
  //     {}
  //   );

  const [formErrors, setFormErrors] = useState<FormErrorsType>({
    productName: { error: false, message: "Product name is required" },
    itemQuantity: { error: false, message: "ItemQuantiy must at least 1" },
    varientNames: new Map(),
    description: { error: false, message: "Description is required" },
    image: { error: false, message: "Description is required" },
  });

  //   USE STATES
  const [productName, setProductName] = useState<string>(product?.name || "");
  const [variants, setVariants] = useState<Variant[]>(
    product?.variants || [initVariant]
  );
  const [quantity, setQuantity] = useState<number | undefined>(
    product?.quantity || ""
  );
  const [description, setDescription] = useState<string>(product?.description);
  //Image state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  //Add produt query
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  //Update product query
  const [editProduct, { isLoading: editProductLoading }] = useEditProductMutation();
  //Get all roduct query
  const {refetch} = useGetAllProductQuery("")
  //use toast
  const toast = useToast();
  // Handles
  const handleVariantChange = (
    name: string,
    field: keyof Variant,
    value: string | number
  ) => {
    setVariants(
      variants.map((variant) =>
        variant.name === name ? { ...variant, [field]: value } : variant
      )
    );
  };

  const handleCheckboxChange = (variantName: string) => {
    const variantExists = variants.find(
      (variant) => variant.name === variantName
    );

    if (variantExists) {
      setVariants(variants.filter((variant) => variant.name !== variantName));
    } else {
      setVariants([
        ...variants,
        {
          id: Date.now(),
          name: variantName,
          price: null,
        },
      ]);
    }
  };

  //Set state for errors
  const handleSetFormErrors = (emptyFields: any, reset = false) => {
    emptyFields.map((fields: Variant) =>
      setFormErrors((prev) => {
        const currMap = new Map(prev.varientNames);
        if (reset) {
          currMap.delete(fields.id);
        } else {
          currMap.set(fields.id, `${fields.name} price is required`);
        }
        return {
          ...prev,
          varientNames: currMap,
        };
      })
    );

    setFormErrors((prev: FormErrorsType) => ({
      ...prev,
      productName: {
        ...prev.productName,
        error: !productName ? true : false,
      },
      itemQuantity: {
        ...prev.itemQuantity,
        error: !quantity ? true : false,
      },
      description: {
        ...prev.description,
        error: !description ? true : false,
      },
      image: {
        ...prev.image,
        error: !selectedImage ? true : false,
      },
    }));
  };

  //   const SetStateForErrors = ()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      name: productName,
      variants,
      quantity,
      description,
      image: selectedImage,
    };
    // Perform the API call to save the product
    if (product) {
      
      try {
        
        const response:any = await editProduct({id: product?._id, ...newProduct}).unwrap()
        if(response.success)
            toast?.open('Prorduct update successfully')
      } catch (error:any) {
          toast?.open(`${error.data.message}. Try Refeshing the browser`)
      }
    } else {
      const res = variants.some((value) => value.price === null);

      if (!res && productName && quantity && description && selectedImage) {
        try {
          const response: any = await createProduct(newProduct).unwrap();
          console.log(response);

          if (response.sucess) {
            toast?.open("Product add successfully");

            const emptyFields = variants.filter(
              (v: any) => !Number.isNaN(v.price)
            );

            //Clear error form
            //console.log(newProduct);

            //After app i response
            //Reset states
            setDescription("");
            setSelectedImage(null);
            setProductName("");
            setQuantity(undefined);
            handleSetFormErrors(emptyFields, true);

            //reset variants
            setVariants((prev) => [initVariant]);
            return;
          }
          toast?.open(response.error.message);
        } catch (error) {
          console.log(error);
        }
      } else {
        //get varient empty fields
        const emptyFields = variants.filter(
          (v: any) => Number.isNaN(v.price) || v.price === null
        );
        //check for the remaining errors
        handleSetFormErrors(emptyFields);
      }
    }
    refetch()
  };

  // Image Handle
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //Show Errors
  const showErrorFunction = (showError: boolean, message: string) => {
    return showError && <p className="text-xs mt-1 text-red-500">{message}</p>;
  };

  return (
    <form className="max-w-lg mx-auto mt-10 h-full">
      <div className="flex gap-2 items-center">
        <div>
          <Label htmlFor="productName" className="block text-sm font-medium">
            Product Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={`${!formErrors.productName && "border border-red-500"} `}
          ></Input>
          {showErrorFunction(
            formErrors.productName.error,
            formErrors.productName.message
          )}
        </div>
        <div>
          <div className="">
            <Label htmlFor="price">Item Quantity</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity?.toString() || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
              className="appearance-none"
            ></Input>
          </div>
          {showErrorFunction(
            formErrors.itemQuantity.error,
            formErrors.itemQuantity.message
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className=" font-medium">Variants</h3>
        <div className="flex flex-wrap space-x-4">
          {availableVariants.map((variantName) => (
            <Label
              key={variantName}
              className="flex items-center space-x-2 mb-2"
              htmlFor={variantName}
            >
              <input
                type="checkbox"
                id={variantName}
                onChange={() => handleCheckboxChange(variantName)}
                checked={variants.some(
                  (variant) => variant.name === variantName
                )}
                className=""
              />
              <span>{variantName}</span>
            </Label>
            // <label htmlFor={variantName} className="text-sm font-medium">
            //   {variantName}
            // </label>
          ))}
        </div>
      </div>

      {variants.map((variant) => (
        <div key={variant.name} className="mb-4">
          <label className="block text-sm font-medium" htmlFor={variant.name}>
            Price for {variant.name}
          </label>
          <Input
            type="number"
            value={variant.price || ""}
            onChange={(e) =>
              handleVariantChange(
                variant.name,
                "price",
                parseFloat(e.target.value)
              )
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formErrors.varientNames.get(variant.id) && (
            <p className="text-xs mt-1 text-red-500">
              {formErrors.varientNames.get(variant.id)}
            </p>
          )}
        </div>
      ))}

      <div className="">
        <Label htmlFor="description">Product Descrition</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter product Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-32 w-full"
        ></Textarea>
        {showErrorFunction(
          formErrors.description.error,
          formErrors.description.message
        )}
      </div>

      {/* Image Uploader Component */}
      <div className="max-w-md mx-auto mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Image
        </label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
        {showErrorFunction(formErrors.image.error, formErrors.image.message)}
        {selectedImage && (
          <div className="mt-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-[400px] rounded-md"
            />
          </div>
        )}
        {product && !selectedImage && (
          <div className="mt-4">
            <ImageWithSkeleton
              src={product?.image?.public_src}
              height={400}
              width={400}
              alt="Selected"
              className="w-full h-[400px] rounded-md"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-3 mb-20">
        <Button
          onClick={handleSubmit}
          className="p-2 text-white rounded-md w-full"
        >
          {isLoading || editProductLoading ? <Loader2 className="animate-spin" /> : product ? "Update Product" : "Save Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductFormTwo;
