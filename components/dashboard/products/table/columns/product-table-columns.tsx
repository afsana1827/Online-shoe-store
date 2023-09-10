"use client";
import { product } from "@prisma/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";
import ProductActiveCell from "./product-active-cell";

const columnHelper = createColumnHelper<product>();
export const productColumns: ColumnDef<product>[] = [
  columnHelper.accessor("images", {
    header: "Image",
    cell: (info) => {
      const [image] = info.getValue() as string[];
      return (
        <div className=" relative w-12 h-12 overflow-hidden rounded-full">
          <Image src={image} fill alt="table img" />
        </div>
      );
    },
  }),

  columnHelper.accessor("name", {
    header: "Name",
  }),

  columnHelper.accessor("sizes", {
    header: "Quantity",
    cell: (info) => {
      const sizes = info.getValue();
      const quantity = sizes?.reduce((a, b: any) => a + b?.quantity, 0);
      return <span>{quantity}</span>;
    },
  }),

  columnHelper.accessor("price", {
    header: "price",
    cell: (info) => {
      const price = info.getValue();
      return (
        <span className="flex items-center justify-center">
          <TbCurrencyTaka size={16} />
          {price}
        </span>
      );
    },
  }),

  columnHelper.accessor("discount", {
    header: "Discount",
    cell: (info) => {
      const discount = info.getValue();
      return (
        <span className="flex items-center justify-center">
          <TbCurrencyTaka size={16} />
          {discount}
        </span>
      );
    },
  }),
  columnHelper.accessor("active", {
    header: "Active",
    cell: (e) => {
      const data = e.row.original;
      return <ProductActiveCell data={data} />;
    },
  }),
];
