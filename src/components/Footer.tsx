import React from "react";
import { ButtonLinksData } from "../../utils/data";
import ButtonLinks from "./ButtonLinks";
import Logo from "./Logo";




const Footer = () => {
  return (
    <div className="bg-black h-64 flex justify-center items-center text-white">
      <div className="flex flex-col justify-between items-center h-full py-10">
        <div className="mt-3 flex flex-col  items-center gap-1">
          <Logo className="text-white" />
          {/* Icons */}
          <div className="flex gap-2"> 
              {
                ButtonLinksData.map((item, index) => <ButtonLinks key={index} href={item.href} type={item.type} />)
              }
          </div>
          <p className="text-center">860-328-6319 amensah8@gmail.com</p> 
          <p>CA Califonia </p>
        </div>
        <div>
          <span className="text-xs text-[#D9D9D9] font-light">
            Copyright 2024
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
