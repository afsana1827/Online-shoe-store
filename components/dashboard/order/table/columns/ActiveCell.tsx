"use client";
import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "@radix-ui/react-icons";
import { order, orderStatus } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { fetches } from "@/lib/refetch";
import DeleteAlert from "./DeleteAlert";
import ProductDetailsModal from "../../modal/productDetails";
import { updateOrder } from "@/action/order/updateOrder";

const ActiveCell: React.FC<{ data: order }> = ({ data }) => {
  const [activeStatus, setActiveStatus] = useState<orderStatus>(
    data.status || "PENDING"
  );

  const { mutate } = useMutation({
    mutationKey: [`update-order-${data.id}`],
    mutationFn: async (e: orderStatus) => {
      const updatedData: order = {
        ...data,
        status: e,
      };

      const response = await updateOrder(data.id, updatedData);
      return response;
    },

    onSuccess: (data) => {
      setActiveStatus(data.status);
      fetches.refetchOrders();
    },
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className=" outline-none text-theme-deep-blue text-xl">
        ...
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className=" border border-theme-light-gray mr-8 bg-white p-4 w-56 rounded shadow-xl">
          <DropdownMenu.Group className=" text-base cursor-default ">
            {/* ACTIVE STATUS */}
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger className=" cursor-default hover:outline-none text-theme-primary hover:bg-theme-deep-blue hover:text-white hover: p-2 hover:rounded">
                Active Status
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent className="dark:text-gray-700 bg-white w-44 rounded shadow-xl p-4">
                  <DropdownMenu.RadioGroup
                    className=" cursor-pointer space-y-3"
                    value={activeStatus}
                    onValueChange={(value: orderStatus) => {
                      mutate(value);
                    }}
                  >
                    <DropdownMenu.RadioItem
                      className=" flex items-center gap-x-2 hover:outline-none hover:bg-theme-light-gray hover:rounded hover:p-1"
                      value="CONFIRMED"
                    >
                      <DropdownMenu.ItemIndicator>
                        <CheckIcon />
                      </DropdownMenu.ItemIndicator>
                      Confirmed
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem
                      className="  flex items-center gap-x-2 hover:outline-none hover:bg-theme-light-gray hover:rounded hover:p-1"
                      value="PENDING"
                    >
                      <DropdownMenu.ItemIndicator>
                        <CheckIcon />
                      </DropdownMenu.ItemIndicator>
                      Pending
                    </DropdownMenu.RadioItem>
                    <DropdownMenu.RadioItem
                      className="  flex items-center gap-x-2 hover:outline-none hover:bg-theme-light-gray hover:rounded hover:p-1"
                      value="PAID"
                    >
                      <DropdownMenu.ItemIndicator>
                        <CheckIcon />
                      </DropdownMenu.ItemIndicator>
                      Paid
                    </DropdownMenu.RadioItem>
                  </DropdownMenu.RadioGroup>
                  <DropdownMenu.Arrow />
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>

            {/* DELETE */}
            <div className="  bg-white text-theme-primary hover:bg-theme-deep-blue hover:text-white hover:outline-none hover: p-2 hover:rounded">
              <DeleteAlert data={data} />
            </div>
          </DropdownMenu.Group>
          <DropdownMenu.Separator className="border border-red-500 my-2" />

          {/* start view details */}
          <ProductDetailsModal data={data} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ActiveCell;
