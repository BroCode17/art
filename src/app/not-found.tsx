"use client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter()
  return (
    <section className="mt-16 flex-col justify-between">
    <div className="flex justify-center">
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you&apos;re lost</h3>

                  <p>the page you are looking for is not avaible!</p>

                  {/* <a
                    href={`${
                      pathname.includes("/admin/dashboard")
                        ? "/admin/dashboard"
                        : "/"
                    }`}
                    className="link_404 hover:bg-muted-foreground"
                  >
                    Go to Home
                  </a> */}
                  <Button className="mt-3 rounded-md" onClick={() => router.back()}>
                    Go Back
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </section>
  );
};

export default NotFound;
