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
              based in Connecticut. He has always had a profound love for art
              and his passion for art has been a constant throughout his life,
              serving as a source of joy and creativity. <br></br>
              The onset of the COVID-19 pandemic became a pivotal moment. WIth
              the world in turmoil and time standing still, he found himself
              returning to his artistic roots, prompting him to dive deeper into
              his craft. <br></br>
              Despite not having a formal art education, his work is a testament
              of grateful talent and relentless curiosity.. Experimenting with
              new concepts and techniques, his artwork is drawn inspiration from
              his life experiences and contemporary ideas. Exploring beauty,
              resilience, vulnerability and strength of the human experience,
              his approach to art is intuitive and explorative. <br></br>
              Artwork is more than a visual experience, but a narrative that
              invites viewers to explore the deeper meanings and emotions behind
              each piece
            </p>
          </div>
          <div className="bg-black h-96 overflow-hidden ">
            <Image
              src="/images/amofa-logo.jpg"
              alt="Logo"
              priority
              height={1000}
              width={1000}
              className="w-full h-full"
            />
          </div>
        </div>
        <RecentWork />
      </Container>
    </div>
  );
};

export default AboutMe;
