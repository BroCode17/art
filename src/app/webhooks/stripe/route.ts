import { RootState, store } from "@/_redux/store/store";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string);

// export const config= {
//   api: {
//     bodyParser: false
//   }
// }

export async function POST(req: NextRequest) {
  //console.log(process.env.STRIPE_WEBHOOK_SECRET)
  // const event = stripe.webhooks.constructEvent(
  //   await req.text(),
  //   req.headers.get("stripe-signature") as string,
  //   process.env.STRIPE_WEBHOOK_SECRET as string
  // );

  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  // console.log('Stripe hook')
  console.log(event.type === "payment_intent.succeeded");
  // console.log(event)

  if (event.type === "payment_intent.succeeded") {
  //   const charge = event.data.object;
  //   const refrenceNumber = charge.metadata.orderReference;
  //   const itemPurchased = JSON.parse(charge.metadata.itemPurchased);
  //   const shippingInfo = JSON.parse(charge.metadata.shippinginfo);
  //   const email = charge.billing_details.email;
  //   const amount = charge.amount;
    // Extracting charge information
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
   // const charge = paymentIntent.charges.data[0];
    const refrenceNumber = paymentIntent.metadata.orderReference;
    const itemPurchased = JSON.parse(paymentIntent.metadata.itemPurchased);
    const shippingInfo = JSON.parse(paymentIntent.metadata.shippinginfo);
    const email = paymentIntent.receipt_email;
    const amount = paymentIntent.amount_received;
    console.log();
    //create order
    const dbProduct: Array<{
      product: string;
      orderedQuantity: number;
      itemSize: string;
    }> = [];
    itemPurchased.forEach((element: any) => {
      dbProduct.push({
        product: element.id,
        orderedQuantity: element.quantity,
        itemSize: element.size,
      });
    });

  

    const orderObject = {
      refrenceNumber,
      customerEmail: email,
      products: dbProduct,
      customerShippingInformation: shippingInfo,
      totalAmount: amount / 100,
    };
    console.log(orderObject);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/orders/create-order`,
        orderObject
      );
      console.log("PUT Response:", response.data);
    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  }

  return new NextResponse();
}
