"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import UserInput from "./UserInput";

export enum FormFiedType {
  NAME = "username",
  DESC = "desc",
  ZIP = "zip",
  STATE = 'state',
}

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please, Enter a valid email address" }),
});

const UserForm = () => {
  // ...
  // const toast = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  const onSubmit = (e: any) => {
    // toast?.open('Information Sent!')
    // console.log(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="space-y-8 ">
          <div className="flex justify-between gap-10 max-sm:flex-col max-sm:gap-3">
            <UserInput
              control={form.control}
              name="firstname"
              fieldType={FormFiedType.NAME}
              label="First Name"
              placeholder="Bro"
            />

            <UserInput
              control={form.control}
              name="lastname"
              fieldType={FormFiedType.NAME}
              label="Last Name"
              placeholder="Code"
            />
            <UserInput
              control={form.control}
              name="email"
              fieldType={FormFiedType.NAME}
              label="Email Address"
              placeholder="example@me.com"
            />
          </div>
          <div className="">
            <UserInput
              control={form.control}
              name="desc"
              fieldType={FormFiedType.DESC}
              label="Lets us know what you need"
              placeholder="Describe what you need us to do for you..."
              textArea={true}
        
            />
          </div>
        </div>

        <p className="mt-2">
          An email will be sent to you by the artist. Please check your email
          for confirmation and date you will recieve your commission
          painting/logo bradinging material, digital media content etc.{" "}
        </p>
        <div className="w-full flex justify-end mt-10">
          <Button type="submit" className="rounded-none w-64 bg-black">
            SEND
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
