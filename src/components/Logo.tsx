'use client'
import { Ink_Free } from "@/local-fonts/local";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Logo = ({ className }: { className?: string }) => {
  const container = useRef(null);

  useGSAP(
    () => {
      const init = () => {
        const t1 = gsap.timeline();
        t1.from(container.current, {
          xPercent: "-1000",
          duration: 1.3,
          delay: 0.3,
          visibility: 0,
        });
        t1.to(container.current, {
          autoAlpha: 1,
        });
      };
      init();
    },
    { scope: container }
  );

  return (
    <div className="cursor-pointer invisible " ref={container} id="logo">
      <Link
        href="/"
        className={cn(`${Ink_Free.className} text-2xl`, 
          className)}
      >
        Amo.arte
      </Link>
    </div>
  );
};

export default Logo;
