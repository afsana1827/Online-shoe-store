"use client";

import { columns } from "@/components/dashboard/order/table/columns/Columns";
import Wrapper from "@/components/wapper";
import { fetches } from "@/lib/refetch";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getMyOrders } from "./getMyOrders";
import ProductDetailsModal from "@/components/dashboard/order/modal/productDetails";
import ReactBasicTable from "@/components/react-table/ReactTable";

function DashboardHome() {
  const { data }: any = useSession();

  const {
    data: orders,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["get-all-orders"],
    enabled: Boolean(data?.user?.id),
    queryFn: () => getMyOrders(data?.user?.id),
  });

  fetches.refetchOrders = refetch;

  if (isLoading || !orders || !data) {
    return (
      <div className="flex items-center justify-center w-full py-40 ">
        <p>data is loading...</p>
      </div>
    );
  }
  columns[5] = {
    id: "active",
    header: "Active",
    cell: (e) => {
      const data = e.row.original;
      return <ProductDetailsModal data={data} />;
    },
  };

  return (
    <Wrapper className="pb-40 space-y-3 ">
      <h5>My Orders</h5>
      <div className="w-full">
        <ReactBasicTable columns={columns} data={orders} />
      </div>
    </Wrapper>
  );
}

export default DashboardHome;
