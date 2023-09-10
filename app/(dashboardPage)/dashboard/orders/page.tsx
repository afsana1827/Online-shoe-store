"use client";
import { getOrders } from "@/action/order/getOrders";
import ActiveCell from "@/components/dashboard/order/table/columns/ActiveCell";
import { columns } from "@/components/dashboard/order/table/columns/Columns";
import ReactBasicTable from "@/components/react-table/ReactTable";
import { Button } from "@/components/ui/button";
import { fetches } from "@/lib/refetch";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PiExportLight } from "react-icons/pi";

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

  const exportData: any = data;

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    doc.text("Order Report", doc.internal.pageSize.getWidth() / 2, 30, {
      align: "center",
    });

    autoTable(doc, {
      head: [["Order ID", "Email", "Items", "Total Price", "Status"]],
      body: exportData.map((item) => [
        item.id,
        item.contact_info.email,

        item.items.products
          .map((product) => {
            return product.name + "(" + product.quantity + `)`;
          })
          .join(" , "),

        "BDT " +
          item.items.products.reduce((totalValue, product) => {
            if (product.discount) {
              return (
                totalValue +
                (product.price - (product.discount || 0)) * product.quantity
              );
            }
            return totalValue + product.price * product.quantity;
          }, 0),
        item.status,
      ]),
      margin: { top: 50 },
    });
    doc.save("report.pdf");
  };
  columns[5] = {
    id: "active",
    header: "Action",
    cell: (e) => {
      const data = e.row.original;
      return <ActiveCell data={data} />;
    },
  };
  return (
    <div className="w-full space-y-3 ">
      <div className="flex items-center justify-between">
        <h5>Orders Table</h5>
        <Button
          className="flex items-center gap-2 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600 "
          onClick={() => {
            exportPDF();
          }}
        >
          <span>
            <PiExportLight />
          </span>
          Export
        </Button>
      </div>
      <div className="w-full ">
        <ReactBasicTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default DashboardHome;
