import React from "react";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

import { cookies } from "next/headers";

interface CustomerInterface{
params: {
  id: string;
  shippinginfo: string;
};
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

//const PaymentPage = async ({ params}: CustomerInterface) => {
const PaymentPage = async ({
  params,
  searchParams,
}: {
  params: { orderReference: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {

  const c = cookies();
  const item = JSON.parse(c.get("cartItems")?.value!);
  
  // const newId = params.orderReference
  // console.log(newId)
  // console.log(typeof searchParams.shippinginfo)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: item.totalAmount,
    currency: "USD",
    metadata: { orderReference: params.orderReference, itemPurchased: JSON.stringify(item?.data), shippinginfo: searchParams?.shippinginfo as string},
  });

  if (paymentIntent.client_secret === null) {
    throw Error("Stripe failed to create payment");
  }

  return (
    <div className="min-h-dvh pb-10 w-full flex justify-center items-center">
      <CheckoutForm clientSecret={paymentIntent.client_secret} id={1} />
    </div>
  );
};

export default PaymentPage;
