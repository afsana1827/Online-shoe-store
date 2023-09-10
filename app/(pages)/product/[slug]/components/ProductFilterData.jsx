"use client";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { setProduct } from "@/store/addCartSlice";
import { setWishList } from "@/store/addWishListSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getDiscountedPricePercentage } from "@/utils/helper";
import { notify, wishify } from "@/utils/notify/notify";
import addToCart from "@/utils/localStorage/addCart";
import { allSizes } from "@/utils/sizes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "@/components/wapper";

const ProductFilterData = ({ result }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();
  const { wishList } = useAppSelector((state) => state.addWishList);
  const { push } = useRouter();
  const sizeOfQuantity = result?.sizes?.find(
    (s) => s.size === selectedSize
  )?.quantity;

  const session = useSession();
  const addProduct = {
    id: result?.id,
    images: result?.images,
    name: result?.name,
    selectedSize,
    price: result?.price,
    sizes: result?.sizes,
    priceId: result?.priceId,
    quantity: 1,
    totalPrice: result?.price * 1,
    discount: result?.discount,
  };

  const totalQuantity = result?.sizes?.reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );

  return (
    <Wrapper className="w-full md:py-20">
      <ToastContainer />

      <div className=" flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
        {/* left */}
        <div className=" rounded-md shadow-md overflow-hidden w-full md:w-auto flex-[1.5] max-w-[500] lg:max-w-full mx-auto lg:mx-0 h-[680px]">
          <ProductDetailsCarousel images={result?.images[0]} />
        </div>
        {/* right */}
        <div className="flex-[1] py-3">
          {/* Product Title  */}
          <div className="text-[34px] font-semibold mb-2 leading-tight">
            {result?.name}
          </div>

          {/* Product Price */}
          <div className="flex items-center">
            <p className="mr-1 text-lg font-semibold">
              MRP :&#2547;{result?.price - result?.discount}
            </p>
            {result?.discount && (
              <p className="text-base font-medium line-through">
                &#2547;{result?.price}
              </p>
            )}
            <div className=" pl-2 text-md font-medium text-black/[0.5]">
              {totalQuantity >= 1 ? (
                ` Q:${totalQuantity} `
              ) : (
                <span className=" text-red-500">Out of stock</span>
              )}
            </div>
            {result?.discount && (
              <p className="ml-auto text-base font-medium text-red-500">
                {getDiscountedPricePercentage(result?.price, result?.discount)}%
                off
              </p>
            )}
          </div>

          <div className="text-md font-medium text-black/[0.5]">
            incl. of taxes
          </div>
          <div className="text-md font-medium text-black/[0.5] mb-20">
            {`(Also includes all applicable duties)`}
          </div>

          <div className="text-md font-medium flex items-center gap-1">
            <span className="font-semibold text-black/[.5]">Quantity:</span>
            {sizeOfQuantity ? (
              sizeOfQuantity > 0 ? (
                <p className=" text-black/[0.5] ">
                  only
                  <span className=" mx-2 bg-green-500 px-1 rounded-sm text-center text-white">
                    {sizeOfQuantity}
                  </span>
                  left in stock
                </p>
              ) : (
                <span className=" text-red-500">Out of stock</span>
              )
            ) : totalQuantity !== 0 ? (
              <span>{totalQuantity}</span>
            ) : (
              <span className=" text-red-500">Out of stock</span>
            )}
          </div>

          {/* Product size range start */}
          <div className="mb-10">
            {/* Heading Start */}
            <div className="flex justify-between mb-2">
              <div className="font-semibold text-md">Select Size</div>
              <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                Select Guide
              </div>
            </div>
            {/* Heading End */}

            {/* Size Start */}
            <div id="sizesGrid" className="grid grid-cols-3 gap-2">
              {allSizes?.map((size, i) => {
                const isHaveSize = result?.sizes?.find((s) => s.size === size);

                return (
                  <button
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      isHaveSize && isHaveSize?.quantity > 0
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowError(false);
                    }}
                    disabled={!isHaveSize && isHaveSize?.quantity > 0}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* SHOW ERROR START */}
            {showError && (
              <div className="mt-1 text-red-600">
                Size selection is required
              </div>
            )}
          </div>
          {/* Add to card */}
          <button
            className="w-full py-4 mb-3 text-lg font-medium text-white transition-transform bg-black rounded-full active:scale-95 hover:opacity-75"
            onClick={() => {
              if (!session?.data) {
                push("/auth/signin");
                // signIn("google", {
                //   callbackUrl: `/product/${result.slug}`,
                // });
                return;
              }
              if (!selectedSize) {
                setShowError(true);
                document.getElementById("sizesGrid").scrollIntoView({
                  block: "center",
                  behavior: "smooth",
                });
              } else {
                addToCart(addProduct);
                dispatch(setProduct(result.selectedSize));

                notify();
              }
            }}
          >
            Add to Cart
          </button>
          {/* Add to card end*/}

          {/* Wishlist button start */}
          <button
            onClick={() => {
              if (!selectedSize) {
                setShowError(true);
                document.getElementById("sizesGrid").scrollIntoView({
                  block: "center",
                  behavior: "smooth",
                });
              } else {
                dispatch(setWishList(addProduct));
                wishify();
              }
            }}
            className="flex items-center justify-center w-full gap-2 py-4 mb-10 text-lg font-medium transition-transform border border-black rounded-full active:scale-95 hover:opacity-75"
          >
            Wishlist
            {wishList.find((item) => item.id === addProduct.id) ? (
              <IoMdHeart className="text-red-500" size={20} />
            ) : (
              <IoMdHeartEmpty size={20} />
            )}
          </button>
          {/* Wishlist end */}

          <div>
            <div className="mb-5 text-lg font-bold">Product Details</div>
            <div className="mb-5 markdown text-md">
              <ReactMarkdown>{result?.description}</ReactMarkdown>
            </div>
          </div>
        </div>
        {/* right column end */}
      </div>
    </Wrapper>
  );
};

export default ProductFilterData;
