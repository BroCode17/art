import React from "react";
import { ButtonLinksData } from "../../utils/data";
import ButtonLinks from "./ButtonLinks";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black h-64 flex justify-center items-center text-white z-50">
      <div className="flex flex-col gap-4 items-center h-full py-10">
        <div className="mt-3 flex flex-col  items-center gap-1 ">
          <Logo className="text-white" />
          {/* Icons */}
          <div className="flex gap-2">
            {ButtonLinksData.map((item, index) => (
              <ButtonLinks key={index} href={item.href} type={item.type} />
            ))}
          </div>
          <p className="text-center">860-328-6319 amensah8@gmail.com</p>
          <p>Connecticut</p>
        </div>

        <p className="text-xs text-[#D9D9D9] font-light">
          Copyright ©2024 | Design and built by&nbsp;
          <Link
            href="https://www.linkedin.com/in/efrimpong"
            className="italic font-light text-xs text-[#D9D9D9]"
          >
            efrimpong
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
