"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; //

import { Carousel } from "react-responsive-carousel";

import { BiArrowBack } from "react-icons/bi";
import { useSession } from "next-auth/react";

const HeroBanner = () => {
  const session = useSession();

  return (
    <div className="relative text-white text-[20px] w-screen h-[calc(100vh-80px)] overflow-hidden">
      <Carousel
        className="w-full h-full"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[65px] bottom-9 w-12 aspect-square bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-4 bottom-9 w-12 aspect-square bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        <div className="w-full h-full">
          <img
            src="/slide-1.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white
            absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px]
            md:text-[30px] uppercase font-medium  cursor-pointer hover:opacity-90"
          >
            Shop now
          </div>
        </div>
        <div>
          <img
            src="/slide-2.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white
            absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px]
            md:text-[30px] uppercase font-medium  cursor-pointer hover:opacity-90"
          >
            Shop now
          </div>
        </div>
        <div>
          <img
            src="/slide-3.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white
            absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px]
            md:text-[30px] uppercase font-medium  cursor-pointer hover:opacity-90"
          >
            Shop now
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner;
