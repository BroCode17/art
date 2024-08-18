"use client";
import G from '@/components/_animations/swipper/G';
import CustomSwiper from '@/components/_animations/swipper/Slide'
import CarosalTwo from '@/components/CarosalTwo';
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
      <section className="mt-10  border h-[500px] lg:h-[550px]  w-full relative">
        <div className=" flex justify-center  relative bg-car-image h-full  bg-black  bg-blend-overlay bg-opacity-50 max-xl:px-2">
          <CarosalTwo />
        </div>
        <G />
      </section>
    </main>
  );
}
