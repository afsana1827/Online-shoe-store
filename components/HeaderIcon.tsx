"use client";

import { useAppSelector } from "@/store/store";
import getCart from "@/utils/localStorage/getCart";
import Link from "next/link";
import React, { memo, useEffect } from "react";
import { BsCart } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";

function HeaderIcon() {
  const {
    addProductCart: { product },
    addWishList: { wishList },
  } = useAppSelector((state) => state);
  const [cart, setCart] = React.useState(0);
  useEffect(() => {
    setCart(getCart().length);
  }, [product]);
  return (
    <div className="flex gap-2 items-center">
      <Link href="/wishlist">
        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
          <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
          {wishList.length > 0 && (
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              {wishList.length}
            </div>
          )}
        </div>
      </Link>
      <Link href="/cart">
        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
          <BsCart className="text-[15px] md:text-[20px]" />
          {cart > 0 && (
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              {cart}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default memo(HeaderIcon);
