"use client";
import { Button } from "@/components/ui/button";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";

import React, { FormEvent, useState } from "react";
type CheckoutFormProps = {
  product?: {};
  clientSecret: string;
  id?: number;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_KEY as string
);

const CheckoutForm = ({ clientSecret }: CheckoutFormProps) => {
  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: 'black',
            focusBoxShadow: ''
          }
        },
      }}
      stripe={stripePromise}
    >
      <Form />
    </Elements>
  );
};

export default CheckoutForm;


const appearance = {
    rules: {
      '.Tab': {
        border: '1px solid #E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
      },

      '.Tab:hover': {
        color: 'var(--colorText)',
      },

      '.Tab--selected': {
        borderColor: '#E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
      },

      '.Input--invalid': {
        boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
      },

      // See all supported class names and selector syntax below
    }
  };

function Form() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const pathname = usePathname();
 stripe?.elements({appearance})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (stripe === null || elements === null || email === null) return;

    setIsLoading(true);

    //Check for existing orders

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/thankyou`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unkown error occured");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <form onSubmit={handleSubmit} className="w-[400px]">
      {errorMessage && <div className="text-destructive">{errorMessage}</div>}
      <PaymentElement />
      <div className="mt-3">
        <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
      </div>
      <div className="mt-4 ">
        <Button
          className={`w-full bg-black text-white ${
            isLoading && "bg-muted-foreground p-4 h-full rounded-sm"
          }`}
          disabled={stripe === null || elements === null}
        >
          {isLoading ? "Processing..." : "Pay"}
        </Button>
      </div>
    </form>
  );
}
