"use client";
import { getOrders } from "@/action/order/getOrders";
import Card from "@/components/dashboard/card/Card";
import ActiveCell from "@/components/dashboard/order/table/columns/ActiveCell";
import { columns } from "@/components/dashboard/order/table/columns/Columns";
import ReactBasicTable from "@/components/react-table/ReactTable";
import { fetches } from "@/lib/refetch";
import { useQuery } from "@tanstack/react-query";
function DashboardHome() {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["get-all-orders"],
    queryFn: getOrders,
  });

  fetches.refetchOrders = refetch;

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center w-full ">
        <p>data is loading...</p>
      </div>
    );
  }
  columns[5] = {
    id: "active",
    header: "Action",
    cell: (e) => {
      const data = e.row.original;
      return <ActiveCell data={data} />;
    },
  };
  return (
    <div className="w-full ">
      <Card />
      <div className="w-full mt-10 ">
        <h2 className="pb-4 text-xl">Recent Orders</h2>
        <ReactBasicTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default DashboardHome;
