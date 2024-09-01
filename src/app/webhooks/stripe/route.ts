import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import Stripe from "stripe";
import { decryptObjectClient } from "../../../../utils/encDecrypt";

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string);


export async function POST(req: NextRequest) {
  let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const refrenceNumber = charge.metadata.orderReference;
    const itemPurchased = JSON.parse(charge.metadata.itemPurchased);
    const shippingInfo = JSON.parse(charge.metadata.shippinginfo);
    const email = charge.billing_details.email;
    const amount = charge.amount;

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

    const h = 1

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NGROK_URL}/api/v1/orders/create-order`,
        orderObject
      );
     // console.log("PUT Response:", response.data);
    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  }

  return new NextResponse();
}
