"use client";
import CustomSwiper from '@/components/_animations/swipper/Slide'
import MyArtPieces from '@/components/MyArt';




export default function Home() {
  return (
    <main className="w-full overflow-hidden relative">
      <section className="w-full relative">
        {/* <Carosal /> */}
        <CustomSwiper />
      </section>
      <section className="" id="#">
        <MyArtPieces />
      </section>
    </main>
  );
}
