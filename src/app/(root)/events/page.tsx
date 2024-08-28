import Container from "@/components/Container";
import React from "react";
import GenericBanner from "../gallery/_components/GenericBanner";
import HeadTitle from "@/components/HeadTitle";
import { Source_Sans_Pro_400 } from "@/local-fonts/local";
import Image from "next/image";

export type ShowType = {
  showType?: string;
};



const PurposeDetails = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex  gap-3 mt-2">
      <div className=" h-full mt-2">
        <div className="border h-3 w-3 border-gray-500 "></div>
      </div>
      <div className="">
      <p>  <span className="font-bold">{title}</span> {desc}</p>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className="min-h-dvh ">
      <GenericBanner
        bannerImgUrl="shop.png"
        bannerTitle="Events/Exhibition"
      />
      <div className="flex  justify-center item-center mt-20 max-lg:p-4">
        <div className="space-y-6">
  
          <Container className={`bg-white`}>
            <div className="w-full">
            <Image
             src='/images/ghana.jpg'
             width={200}
             height={220}
             alt="Ghana"
            />
            </div>
            <h3 className=  {`mb-2 ${Source_Sans_Pro_400.className} -mt-4`}>Deal Friends and Supports</h3>
            <p className={` ${Source_Sans_Pro_400.className} `}>
              I&apos;m exiceted to share with your an initiative close to my
              heart: &quot;A Story to Tell&quot;. This project is all about
              bringing transformatiive power of art to young student in Ghana.
              Our journey begins with Mensah Saahene Primary School in Mampong,
              Ghana, wherre we aim to provide student with eseetial art tools
              and resources they need to equotxpore their creativity and share
              their unique stories with the worlds.
            </p>
            <div className={`mb-2 ${Source_Sans_Pro_400.className} `}>
              <h1 className="font-bold">Our Purpose:</h1>

              <PurposeDetails
                title="Igniting Creativity:"
                desc="We believe that
      every child has a story wating to be told. By equipping students with art
      tools, we're giving them the opportunity to explore their imagination
      s and express theselves creatively."
              />
              <PurposeDetails
                title="Enriching Education:"
                desc="Art is a powerful tool in education, fostering not only creativity but also crtical thinking and emotional growth. Our goal is to make art an integral part of the students' learning experience"
              />
              <PurposeDetails
                title="Celebrating Culture:"
                desc="Through art, students can connect with their cultural heritage and explore their identities. This project encourages them to celbrate and share their rich cultural backgrounds"
              />
              <PurposeDetails
                title="building Confidnenc"
                desc="Art fosters self-esteem and confidence, offering student a positive outlet for self-expression and personal growth"
              />

              <h1 className="font-bold mt-4">Ways You Can Support</h1>

              <PurposeDetails
                title="Purchase with Impact:"
                desc="Proceeds from out previous and ongoing art sales, as well as future exhibitions, will be directed to fund this initiative"
              />
              <PurposeDetails
                title="Make a Donation:"
                desc="Financial contributions will go townads purchasing the essential art supplies and materials these student need. Individual donor reports as well as regular monthly project progress reports will be presented"
              />
              <PurposeDetails
                title="In-Kind Contributions:"
                desc="We also welcome in-kind donations of art suppliers and resources, which will be utilized by the students"
              />
              <PurposeDetails
                title="Spread the Word:"
                desc="Help us expand our reach by sharing out mission with others who may be interested in supporting this project"
              />
            </div>
            <p className={`mb-2 ${Source_Sans_Pro_400.className} `}>Your suppor tis crucial in helping us creating a brighter future for student by jouning us, you&apos;re not just providing them with tools; you&apos;re givig them the opportunity to discover their talents, explore thier idnetities, and tell thier own stories through art.</p>
            <p className={`mb-2 ${Source_Sans_Pro_400.className} `}>
              For more information or to get involved, please contact me at <a href="tel:">860-328-6319</a>, <a href="mailto:amensah8@gmail.com">amensah8@gmail.com</a>. Our team looks forward to workign together to make this vision a reality.
            </p>

            <p className={`mb-2 ${Source_Sans_Pro_400.className} `}>
                Thank your for being a part of this journey and for believing in the power of art to transform lives.
            </p>

            <p className={`mb-1 ${Source_Sans_Pro_400.className} `}>Warmest Regards</p>
            <p className={`${Source_Sans_Pro_400.className} `}>Amo-Mensah Amofa | Amo.Arte</p>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default page;
