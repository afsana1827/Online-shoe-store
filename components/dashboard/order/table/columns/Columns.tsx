"use client";
import { order } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { TbCurrencyTaka } from "react-icons/tb";
import ActiveCell from "./ActiveCell";

const columnHelper = createColumnHelper<order>();
export const columns: ColumnDef<order>[] = [
  columnHelper.accessor("id", {
    header: "Order Id",
    cell: (info) => {
      return info.getValue();
    },
  }),

  columnHelper.accessor("contact_info.email", {
    header: "Email",
    cell: (info: any) => <i>{info.getValue()}</i>,
  }),

  columnHelper.accessor("items", {
    header: "Items",
    cell: (info: any) => {
      const { products } = info.getValue() || { products: [] };
      return products
        .map((item: any) => {
          return item.name + "(" + item.quantity + ")";
        })
        .join(" , ");
    },
  }),
  columnHelper.accessor("items", {
    header: "Total Price",
    cell: (info: any) => {
      const { products } = info.getValue() || { products: [] };
      const total = products.reduce((totalValue: number, product: any) => {
        if (product?.discount) {
          return (
            totalValue +
            (product.price - (product.discount || 0)) * product.quantity
          );
        }
        return totalValue + product.price * product.quantity;
      }, 0);

      return (
        <div className="flex items-center justify-center">
          <TbCurrencyTaka size={16} />
          <span>{total}</span>
        </div>
      );
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
  }),
];
