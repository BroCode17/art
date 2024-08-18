import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Control } from "react-hook-form";
import { FormFiedType } from "./UserForm";
import { Input } from "./ui/input";
import {
  Source_Sans_Pro_400,
  Source_Sans_Pro_Bold,
  Source_Sans_Pro_Light,
  Source_Sans_Pro_SemiBold,
} from "@/local-fonts/local";
import { Textarea } from "./ui/textarea";

interface CustomProps {
  fieldType: FormFiedType;
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  textArea?: boolean;
}

const Render = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, placeholder } = props;
  switch (fieldType) {
    case FormFiedType.NAME:
      return (
        <FormControl className="">
          <Input
            placeholder={placeholder}
            {...field}
            className={`rounded-xs placeholder:text-form-soft ${Source_Sans_Pro_400.className} text-md `}
          />
        </FormControl>
      );
    case FormFiedType.DESC:
      return (
        <FormControl
          className={`h-[250px] placeholder:text-form-soft  ${Source_Sans_Pro_400.className} rounded-none text-md`}
        >
          <Textarea
            placeholder={placeholder}
            className="resize-none"
            {...field}
          />
        </FormControl>
      );
    case FormFiedType.ZIP:
      return (
        <FormControl className="">
          <Input
            placeholder={placeholder}
            {...field}
            className={`rounded-xs placeholder:text-form-soft ${Source_Sans_Pro_400.className} text-md `}
            type="number"
          />
        </FormControl>
      );
    case FormFiedType.STATE:
      return (
        <FormControl className="">
          <Input
            placeholder={placeholder}
            {...field}
            className={`rounded-xs placeholder:text-form-soft ${Source_Sans_Pro_400.className} text-md uppercase`}
            type="text"
            maxLength={2}
          />
        </FormControl>
      );
    default:
      break;
  }
};

const UserInput = (props: CustomProps) => {
  const { control, label, name, textArea } = props;
  return (
    <div className={`w-full ${Source_Sans_Pro_400.className} `}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className={`${textArea && "text-md"} text-md`}>
              {label}
            </FormLabel>
            <Render field={field} props={props} />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UserInput;
