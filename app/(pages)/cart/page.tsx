"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import CartItem from "@/components/CartItem";

import Wrapper from "@/components/wapper";
import { useAppSelector } from "@/store/store";
import getCart from "@/utils/localStorage/getCart";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { product } = useAppSelector((state) => state.addProductCart);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(getCart());
  }, [product, quantity]);

  const subTotal = useMemo(() => {
    const subTotals = cart.reduce((total, val) => {
      if (val?.discount) {
        return total + (val?.price - (val?.discount || 0)) * val?.quantity;
      } else {
        return total + val.price * val.quantity;
      }
    }, 0);
    return subTotals;
  }, [cart]);

  //
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cart.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    setQuantity={(e) => setQuantity(e)}
                    data={item}
                  />
                ))}
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#2547; {subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* BUTTON START */}
                <Link href="/billing">
                  <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
                    Checkout
                  </button>
                </Link>
                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}
        {cart.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
              alt="empty cart"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
// test
