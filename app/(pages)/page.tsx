import { getProducts } from "@/action/products/getProducts";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/wapper";

// import { useState } from "react";

export default async function Home() {
  // const [session, setSession] = useState(false);
  const products = await getProducts();

  return (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* Heading and paragraph section */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            FIND YOUR PERFECT RUNNING SHOE
          </div>
          <div className="text-md md:text-xl">
            A collection of shoes for men characterized by sneakers, Horsebit
            loafers, Princetown slippers, lace ups, ankle boots and slides.
          </div>
        </div>
        {/* product grid start */}
        <div className=" my-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products?.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
        {/* product grid end */}
      </Wrapper>
    </main>
  );
}
