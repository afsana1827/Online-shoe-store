"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsPencil } from "react-icons/bs";
import { product } from "@prisma/client";
import ProductDeleteAlert from "./product-delete-alert";

const ProductActiveCell: React.FC<{ data: product }> = ({ data }) => {
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className=" outline-none text-theme-deep-blue text-xl">
        ...
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className=" border border-theme-light-gray mr-8 bg-white p-4 w-56 rounded shadow-xl">
          <DropdownMenu.Group className=" text-base cursor-default ">
            <DropdownMenu.Item
              className=" flex items-center gap-x-2 bg-white text-theme-primary hover:bg-theme-deep-blue hover:text-white hover:outline-none hover: p-2 hover:rounded"
              onClick={() =>
                router.push(`/dashboard/products/edit-products/${data.id}`)
              }
            >
              Edit
              <BsPencil size={14} />
            </DropdownMenu.Item>
            {/* DELETE */}
            <div className="  bg-white text-theme-primary hover:bg-theme-deep-blue hover:text-white hover:outline-none hover: p-2 hover:rounded">
              <ProductDeleteAlert data={data} />
            </div>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProductActiveCell;
