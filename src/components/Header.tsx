"use client";
import { ITC_Font } from "@/local-fonts/local";
import React, { useEffect, useRef } from "react";
import Logo from "./Logo";
import { linkData } from "../../utils/data";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaHamburger } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setShowMobileNav } from "@/_redux/slices/headerSlice";
import { IoClose } from "react-icons/io5";
import Cart from "./Cart";

gsap.registerPlugin(useGSAP);

const MobileNavIcon = () => {
  const dispatch = useDispatch();
  return (
    <div className=" cursor-pointer" onClick={() => dispatch(setShowMobileNav())}>
      <RxHamburgerMenu size={22} />
    </div>
  );
};

export const MobileNav = () => {
  const show = useSelector((state: any) => state.header.showMobileNav);
  // if(!show) return
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount or when show changes
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);
  
  return (
    <div className={`${ITC_Font.className} text-white h-full`}>
      <ul className={`flex flex-col gap-5 font-normal text-sm items-center mt-10`}>
        {linkData.map((item, index) => (
          <Link key={index} href={item.url} onClick={() => dispatch(setShowMobileNav())} className="hover:scale-90">
            {item.name}
          </Link>
        ))}
        <IoClose size={24} onClick={() => dispatch(setShowMobileNav())} className="cursor-pointer hover:scale-90"/>
      </ul>
    </div>
  );
};

const Header = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const init = () => {
        const t1 = gsap.timeline();
        t1.from("ul", {
          xPercent: "-100",
          duration: 1,
          delay: 0.1,
          visibility: 0,
        });
        t1.to("ul", {
          autoAlpha: 1,
        });
      };
      init();
    },
    { scope: container }
  );

  return (
    <header
      className="h-[81px] bg-black flex items-center justify-center sticky top-0 z-50 "
      ref={container}
      id="head-main"
    >
      <div className=" text-white flex justify-between w-5/6 2xl:w-4/6 items-center leading-5">
        <Logo />
        <div className={`max-lg:hidden  ${ITC_Font.className}`}>
          <ul
            className={`flex gap-3 font-normal text-sm invisible items-center`}
          >
            {linkData.map((item, index) => (
              <Link key={index} href={item.url}>
                {item.name}
              </Link>
            ))}
            <Cart />
          </ul>
        </div>
        <div className="flex gap-4 items-center lg:invisible absolute right-10">
          <Cart />
          <MobileNavIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
