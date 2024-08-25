"use client";

import Container from "@/components/Container";
import HeadTitle from "@/components/HeadTitle";
import { Form } from "@/components/ui/form";
import React, { useCallback, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UserInput from "@/components/UserInput";
import { FormFiedType } from "@/components/UserForm";
import { useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ITC_Font } from "@/local-fonts/local";
import GenericBanner from "@/app/gallery/_components/GenericBanner";
import Cookies from 'js-cookie';
import { formatCurrency } from "../../../../utils/formatters";
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  city: z.string().min(2).max(50),
  address: z.string().min(5).max(50),
  aptnumber: z.string().optional(),
  state: z.string().min(2).max(2).toUpperCase(),
  zipCode: z.string().min(5).max(5)
});

interface OrderItemProps {
  title: string;
  price: number;
  desc: string;
}


const getOrderNumberFromCookie = () => {
  return Cookies.get('orderNumber')
}

const OrderItem = ({ title, price, desc }: OrderItemProps) => {
  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className={`${ITC_Font.className} text-xl md:text-2xl`}>
        &quot;{title}&quot;
      </h1>
      <p className="font-[500]">{formatCurrency(price / 100)}</p>
      <p className="text-sm font-light text-center">{desc}</p>
    </div>
  );
};

const OrderDetailsPage = ({params: id}: {params: {id: string}}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  // if(getOrderNumberFromCookie() !== id as string) re

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city:"",
      address: "",
      aptnumber: "",
      state: "",
      zipCode: ""
    },
  });

  const orderItems = useSelector((state: any) => state.cart.products);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);
  const deliveryAmount = useSelector((state: any) => state.cart.deliveryAmount);

  

  const onSubmit = (e: any) => {
    //create order details and send to db
    //Cookies.set('shipInfo', JSON.stringify({data: e}), {expires: 1} );
    // router.replace(`${pathname}/payment`);
    // router.replace({
    //   pathname: '/product/[id]',
    //   query:{ id: '123', ref: 'google' },
    // });
    router.push(`${pathname}/payment` + '?' + createQueryString('shippinginfo', JSON.stringify(e)))

  };

  return (
    <div className="min-h-dvh w-full ">
      <div className="">
        <GenericBanner
          bannerImgUrl="shop.png"
          bannerTitle="Order Information"
        />
        <div className="w-full flex justify-center">
          <Container className="bg-white mt-20 ">
            <HeadTitle
              title={`Shipping Information`}
              className="text-start mb-5"
            />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full"
               
              >
                <div className="flex flex-col items-center gap-6 md:flex-row md:px-3 xl:px-0 md:gap-2">
                  <div className="flex felx-col  md:w-[50%]">
                    <div className="space-y-6 w-full ">
                      <div className="flex gap-2">
                        <UserInput
                          control={form.control}
                          name="firstName"
                          fieldType={FormFiedType.NAME}
                          label="First Name"
                          placeholder="Frist Names"
                        />
                        <UserInput
                          control={form.control}
                          name="lastName"
                          fieldType={FormFiedType.NAME}
                          label="Last Name"
                          placeholder="Last Names"
                        />
                      </div>
                      <div className="w-full">
                      <UserInput
                          control={form.control}
                          name="address"
                          fieldType={FormFiedType.NAME}
                          label="Address"
                          placeholder="123 Main Street"
                        />
                      <UserInput
                          control={form.control}
                          name="city"
                          fieldType={FormFiedType.NAME}
                          label="City"
                          placeholder="City"
                        />
                        {/* <UserInput
                          control={form.control}
                          name="address"
                          fieldType={FormFiedType.NAME}
                          label="Street Address"
                          placeholder="Street Address"
                          
                        /> */}
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3/6">
                          <UserInput
                            control={form.control}
                            name="aptnumber"
                            fieldType={FormFiedType.NAME}
                            label="Apartment Number"
                            placeholder="No 4/B3"
                          />
                        </div>
                        <div className="w-2/6">
                          <UserInput
                            control={form.control}
                            name="state"
                            fieldType={FormFiedType.STATE}
                            label="State"
                            placeholder="IL"
                          />
                        </div>
                        <div className="w-1/6">
                          <UserInput
                            control={form.control}
                            name="zipCode"
                            fieldType={FormFiedType.NAME}
                            label="Zip Code"
                            placeholder="00000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-[400px] border border-black p-10 flex flex-col items-center">
                    <div className={`w-10/12 space-y-3`}>
                      <h1 className="text-xl font-semibold">Order Summary</h1>
                      <hr className=" h-[2px] bg-gray-300 rounded-sm"></hr>
                      {/* <OrderItem
                        title="For Your Eyes Only I"
                        price={200.0}
                        desc="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
                      /> */}
                      {orderItems &&
                        orderItems.map((item: any) => {
                          return (
                            <OrderItem
                              key={item.title}
                              title={item.title}
                              price={item.price}
                              desc={item.description}
                            />
                          );
                        })}
                      <div className="flex flex-col ">
                        <div className="flex justify-between">
                          <span className="font-[500] text-sm">Subtotal:</span>
                          <span className="font-[500] text-sm">{formatCurrency(totalAmount/100)}</span>
                        </div>
                        <div className="h-[1px] w-full bg-black"></div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm font-[500]">
                            Delivery cost:
                          </span>
                          <span className="text-sm font-[500]">{formatCurrency(deliveryAmount / 100)}</span>
                        </div>
                        
                        {deliveryAmount === 0.0 ? <p className="text-muted-foreground text-xs">Free</p> : 
                        <p className="text-muted-foreground text-xs">Fast</p>}
                        {/* Change it */}
                        <div className="h-[1px] w-full bg-black"></div>
                        <div className="flex justify-between mt-2">
                          <span className="font-extrabold text-sm">Total:</span>
                          <span className="font-extrabold text-sm">
                            {formatCurrency((totalAmount + deliveryAmount)/100)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-2">
                      <button
                        className="bg-black text-white text-xs py-3 mt-2 font-semibold w-full uppercase"
                        type="submit"
                      >
                        Continue Payment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
