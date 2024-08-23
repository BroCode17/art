import React from "react";
import Container from "./Container";
import RecentWork from "./RecentWork";
import Image from "next/image";


const AboutMe = () => {
  return (
    <div className="text-black flex justify-center mt-20 max-md:px-2 max-lg:p-6 overflow-hidden">
      <Container className="bg-white">
        <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          <div className="flex flex-col gap-2 text-justify text-sm">
            <p>
              Amo-Mensah was born in Agona, Ghana and is a self-taught artist
              based in Glastonbury, Connecticut. Having developed an interest in
              art since a child, when the world became still because of the
              COVID pandemic when the world became still, he found himself
              venturing back into art. He embarked on this journey with a
              passion of unraveling the complexities of the human experience.
              Without the confines of a formal art education, Amo embraced
              experimentation, honing his craft through trial and error and
              drawing inspiration from the depths of his own emotions and
              observation.
            </p>

            <p>
              His art explores beauty, resilience, vulnerability and strength of
              the human experience, serving as a mirror reflecting the
              intricacies of existence, inviting viewers to confront their own
              truths and perceptions of the world. Still new to the art world,
              Amo is eager to learn and gain more experience that will translate
              in his artwork. He invites us to embark on a transformative
              journey, one that transcends the confines of the canvas and
              resonates deep within the minds and hearts of the viewer
            </p>
          </div>
          <div className="bg-black h-96 overflow-hidden ">
            <Image src="/images/amofa-logo.jpg" alt="Logo" priority   height={1000} width={1000} className="w-full h-full" />
          </div>
        </div>
        <RecentWork />
      </Container>
    </div>
  );
};

export default AboutMe;
