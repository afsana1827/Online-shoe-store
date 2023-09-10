"use client";
import { getOrders } from "@/action/order/getOrders";
import { getProducts } from "@/action/products/getProducts";
import { DashCardDataType } from "@/types";
import { useQueries } from "@tanstack/react-query";
import { GiConverseShoe } from "react-icons/gi";
import { PiShoppingCartSimpleFill, PiUsersThree } from "react-icons/pi";
import { TbCurrencyTaka } from "react-icons/tb";

const Card = () => {
  const result = useQueries({
    queries: [
      {
        queryKey: ["orders"],
        queryFn: getOrders,
      },
      {
        queryKey: ["products"],
        queryFn: getProducts,
      },
    ],
  });
  const { data: getOrdersData, isLoading: orderLoading } = result[0];
  const { data: products, isLoading } = result[1];

  const orders: any = getOrdersData;

  const customer = new Set(
    orders?.map((item: any) => item?.contact_info?.email)
  ).size;
  const totalPrice = orders?.reduce(
    (totalAmount: number, order) =>
      totalAmount +
      order?.items?.products?.reduce((totalValue: number, item: any) => {
        if (item?.discount) {
          return (
            totalValue + (item?.price - (item?.discount || 0)) * item?.quantity
          );
        }
        return totalValue + item.price * item.quantity;
      }, 0),
    0
  );

  const dashCardData: DashCardDataType[] = [
    {
      id: 1,
      label: "Customers",
      value: customer | 0,
      icon: PiUsersThree,
    },
    {
      id: 2,
      label: " products",
      value: products?.length | 0,
      icon: GiConverseShoe,
    },
    {
      id: 3,
      label: "Sales",
      value: totalPrice | 0,
      icon: TbCurrencyTaka,
    },
    {
      id: 4,
      label: "Orders",
      value: orders?.length | 0,
      icon: PiShoppingCartSimpleFill,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      {isLoading || orderLoading ? (
        <>
          {[1, 2, 3, 4].map((_item, index) => {
            return <Skeleton key={index} />;
          })}
        </>
      ) : (
        <>
          {dashCardData.map((item, index) => {
            return (
              <div
                key={index}
                className=" bg-theme-primary h-24 w-full p-4 rounded-md shadow-md"
              >
                <div className=" flex items-center gap-x-3">
                  <div className=" h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center">
                    <item.icon className=" text-white" size={24} />
                  </div>
                  <div>
                    <p className=" text-base text-gray-700">{item.label}</p>
                    <span className=" text-base text-white font-bold">
                      {item.value}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Card;

const Skeleton = () => {
  return (
    <div className="bg-gray-500 h-24 w-full p-4 rounded-md shadow-md animate-pulse">
      <div className=" flex items-center gap-x-3">
        <div className="h-16 w-16 animate-pulse rounded-full bg-gray-300 flex items-center justify-center"></div>
        <div className="space-y-1.5">
          <p className="bg-gray-300 animate-pulse h-3 w-32 rounded"></p>
          <p className="bg-gray-300 animate-pulse h-3 w-24 rounded"></p>
        </div>
      </div>
    </div>
  );
};
