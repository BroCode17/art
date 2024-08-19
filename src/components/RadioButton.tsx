"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  Product,
  ProductFromCartPageProps,
} from "@/_redux/slices/cartSlice";
import { useToast } from "@/app/shop/_components/toast-context";


const FormSchema = z.object({
  type: z.enum(["fast", "free"], {
    required_error: "Delivery Method Required",
  }),
});

interface FormRadioItemProps {
  del: string;
  date: string;
  rec?: boolean;
  image: string;
  sender: string;
  price?: string;
  value: string;
  
}

const FormRadioItem = ({
  del,
  date,
  rec,
  image,
  sender,
  price,
  value,

}: FormRadioItemProps) => {

  return (
    <FormItem className="flex items-center space-x-1 space-y-0  bg-[#F0F0F0] px-4 h-18">
      <FormControl>
        <RadioGroupItem value={value} className="border-soft" />
      </FormControl>
      <div className="flex items-center justify-between w-full">
        <div className=" p-2 w-10/12">
          <FormLabel className={`text-sm font-normal`}>
            {price && <span className="font-semibold ">${price}</span>}{" "}
            {rec && <span className="text-md">&#x2022;</span>} {del}
            <p className="text-[.675rem] -mt-1 text-[#727070]">
              {date}{" "}
              {rec && (
                <span className="text-[.675rem] ml-1 text-[#0160EE] rounded-full  bg-[#0160EE] bg-opacity-35 text-center px-1">
                  Recommended
                </span>
              )}
            </p>
          </FormLabel>
        </div>
        <div className="w-[40px] h-[30px]">
          <Image
            src={image}
            alt={sender}
            width={40}
            height={30}
            className="object-contain h-full w-full"
            priority
          />
        </div>
      </div>
    </FormItem>
  );
};

export function RadioButton({
  title,
  quantity,
  price,
  id,
  image,
  size
}: ProductFromCartPageProps) {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "free",
    },
  });

  const dispatch = useDispatch();

  const newPrice = Number(price.substring(1) || 0.0);


  function onSubmit(data: z.infer<typeof FormSchema>) {

    const selectedItem = {
      id,
      price: newPrice,
      title,
      quantity,
      deliveryMethod: data.type,
      image,
      size
    } as Product;
    dispatch(addProduct(selectedItem));

    //push to global cart
   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl className="">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormRadioItem
                    date="Receive it in 3 days"
                    del="Fast Delivery"
                    image="/images/dhl.png"
                    price="5.59"
                    rec={true}
                    sender="DHL"
                    value="fast"
                    key={"Fast Delivery"}
                  />
                  <FormRadioItem
                    date="Receive it in 5-7 days"
                    del="Free Delivery"
                    image="/images/free.png"
                    sender="DHL"
                    value="free"
                    key={"Free Delivery"}
                  />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <CheckoutBtn name="add out" />
      </form>
    </Form>
  );
}

export const CheckoutBtn = ({name}: {name: string}) => {
  const toast = useToast();

  return (
    <button
      className="bg-black text-white text-xs py-3 mt-2 font-semibold w-full uppercase"
      type="submit"
      onClick={() => toast?.open('Item Added Successfully')}
    >
      {name}
    </button>
  );
};
