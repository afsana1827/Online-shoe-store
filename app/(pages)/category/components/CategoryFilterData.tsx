"use client";

import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/wapper";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

function CategoryFilterData({ result }: any) {
  const [pageIndex, setPageIndex] = useState(1);
  const query = useSearchParams();
  const maxResult = 3;
  const { slug } = useParams();
  console.log({ result });

  return (
    <div className=" w-full md:py-20 relative">
      <Wrapper>
        <div className=" text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {result?.name}
          </div>
        </div>

        {/* products grid start */}
        <div>
          {result?.products?.length > 0 ? (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {result?.products?.map((product) => (
                <ProductCard key={product?.id} data={product} />
              ))}
            </div>
          ) : (
            <div className="text-center h-[40vh] flex justify-center items-center">
              <p>Products Not Found</p>
            </div>
          )}
        </div>
        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {/* {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )} */}
        {/* PAGINATION BUTTONS END */}
        {/* {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )} */}
      </Wrapper>
    </div>
  );
}

export default CategoryFilterData;
