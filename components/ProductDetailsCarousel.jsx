"use client";

import Image from "next/image";
import React from "react";
function ProductDetailsCarousel({ images }) {
  return (
    <div className=" relative w-full h-full">
      <Image src={images} fill alt="product-img" />
    </div>
  );
}

export default ProductDetailsCarousel;
