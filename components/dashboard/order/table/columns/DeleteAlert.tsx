import React from "react";
import { FiDelete } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetches } from "@/lib/refetch";
import { toast } from "react-hot-toast";
import { order } from "@prisma/client";
import { deleteOrder } from "@/action/order/deleteOrder";

const DeleteAlert: React.FC<{ data?: order }> = ({ data }) => {
  const handleDeleteOrder = async () => {
    try {
      deleteOrder(data.id).then((res) => {
        fetches.refetchOrders();

        toast.success("Deleted Data");
      });
    } catch (error) {
      toast.error("Deleting is failed");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className=" hover:text-red-400 flex items-center gap-x-2">
        Delete
        <FiDelete size={12} className=" text-red-400" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteOrder}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
