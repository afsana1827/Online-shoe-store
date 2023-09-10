"use client";

import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

import { removeProduct } from "@/store/addCartSlice";
import { useAppDispatch } from "@/store/store";
import addToCart from "@/utils/localStorage/addCart";
import removeFromCart from "@/utils/localStorage/removeCartItem";

const CartItem = ({ data, setQuantity }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={data?.images[0]}
          alt={data?.name}
          width={120}
          height={120}
        />
      </div>
      {/* IMAGE END */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {data?.name}
          </div>
          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {data?.subtitle}
          </div>
          {/* PEODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 w-max flex">
            MRP :{" "}
            {data?.discount ? (
              <div className="space-x-1">
                <span>&#2547;{data?.price - data?.discount}</span>
                <span className="line-through text-red-400">
                  &#2547;{data?.price}
                </span>
              </div>
            ) : (
              <span>&#2547;{data?.price}</span>
            )}
          </div>
        </div>
        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {data?.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="hover:text-black"
                onChange={(e) =>
                  addToCart({ ...data, selectedSize: e.target.value })
                }
              >
                {data?.sizes?.map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={item?.size}
                      selected={data.selectedSize === item?.size}
                    >
                      {item?.size}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                onChange={(e) => {
                  addToCart({ ...data, quantity: +e.target.value });
                  setQuantity(+e.target.value);
                }}
              >
                {Array.from(
                  {
                    length: data?.sizes.find(
                      (q) => q.size === data?.selectedSize
                    )?.quantity,
                  },
                  (_, i) => i + 1
                ).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => {
              removeFromCart(data.id, data.selectedSize);
              dispatch(removeProduct(data.selectedSize));
            }}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
