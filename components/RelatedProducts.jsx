"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategoryId } from "@/action/products/getProducts";

const RelatedProducts = ({ categoryId, slug }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-products"],
    queryFn: async () => JSON.parse(await getProductsByCategoryId(categoryId)),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-[50px] md:mt-[100px] pb-[100px]">
      <div className="text-2xl font-bold mb-5">You Might Also Like</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data
          ?.filter((item) => item.slug !== slug)
          ?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
