"use client";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wapper";
import { setProduct } from "@/store/addCartSlice";
import { removeWishList, setClearWishList } from "@/store/addWishListSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import addToCart from "@/utils/localStorage/addCart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

function WishListPage() {
  const { wishList } = useAppSelector((state) => state.addWishList);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="bg-gray-50">
      <Wrapper>
        <div className="w-full space-y-3 overflow-x-auto">
          {wishList.length > 0 ? (
            <div className="">
              <div className="grid grid-cols-4 gap-4">
                <p className="text-lg  font-semibold text-center">Name</p>
                <p className="text-lg  font-semibold text-center">Price</p>
                <p className="text-lg  font-semibold text-center">
                  Stock Status
                </p>
                <p className="text-lg  font-semibold text-center"></p>
              </div>
              {wishList.map((item) => {
                return (
                  <div className="px-2 py-5 border-y grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <button onClick={() => dispatch(removeWishList(item.id))}>
                        <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]" />
                      </button>
                      <div className="relative shrink-0 w-[80px] aspect-square overflow-hidden rounded-md">
                        <Image
                          src={item?.images[0]}
                          alt={item?.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="truncate text-ellipsis">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <p className="line-through">&#2547;{item.price}</p>
                      <p className="bg-yellow-100 px-2">
                        &#2547;{item?.price - item?.discount || 0}
                      </p>
                    </div>
                    <div className="flex justify-center items-center">
                      {item?.quantity > 0 ? (
                        <span className="inline-block px-3 py-1 border border-green-500 text-green-500 rounded">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 border border-red-500 text-red-500 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <div className="flex justify-center items-center">
                      <Button
                        onClick={() => {
                          addToCart(item);
                          dispatch(setProduct(item.selectedSize));
                          dispatch(removeWishList(item.id));
                          if (wishList.length < 2) {
                            router.push("/cart");
                          }
                        }}
                        disabled={item.quantity <= 0}
                        className="w-max"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
              <Image
                src="/empty-cart.jpg"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
                alt="Empty Cart"
              />
              <span className="text-xl font-bold">Your WishList is empty</span>
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

          <div className="pb-10">
            <Button
              onClick={() => {
                wishList.forEach((item) => {
                  addToCart(item);
                  dispatch(setProduct(item.selectedSize));
                });
                router.push("/cart");
                setTimeout(() => {
                  dispatch(setClearWishList());
                }, 500);
              }}
              className="w-max"
            >
              Add to Cart all
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

export default WishListPage;
