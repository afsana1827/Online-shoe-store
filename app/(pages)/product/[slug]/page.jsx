import React from "react";
import ProductFilterData from "./components/ProductFilterData";
import { getProductBySlug } from "@/action/products/getProductBySlug";
import Wrapper from "@/components/wapper";
import ReleatedProducts from "@/components/RelatedProducts";

const Product = async ({ params: { slug } }) => {
  const result = await getProductBySlug(slug);

  return (
    <div>
      <ProductFilterData result={result} />
      {result && (
        <Wrapper>
          <ReleatedProducts categoryId={result?.categoryId} slug={slug} />
        </Wrapper>
      )}
    </div>
  );
};

export default Product;
