import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ data }: { data: any }) => {
  return (
    <Link
      href={`/product/${data?.slug}`}
      className=" rounded-md shadow-md transform w-full bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <div className=" w-full aspect-square relative overflow-hidden">
        <Image
          fill
          src={data.images[0]}
          alt={data?.name}
          className="object-cover"
        />
      </div>
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{data?.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          {data?.discount ? (
            <>
              <p className="mr-2 text-lg font-semibold">
                &#2547;{data?.price - data?.discount}
              </p>
              <p className="text-base font-medium line-through">
                &#2547;{data?.price}
              </p>
              <p className="ml-auto text-base font-medium text-red-500">
                {getDiscountedPricePercentage(data?.price, data?.discount)}
                %off
              </p>
            </>
          ) : (
            <p className="mr-2 text-lg font-semibold">&#2547;{data?.price}</p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
