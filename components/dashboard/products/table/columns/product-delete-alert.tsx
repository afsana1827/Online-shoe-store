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
import { product } from "@prisma/client";
import { deleteProduct } from "@/action/products/deleteProduct";

const ProductDeleteAlert: React.FC<{ data?: product }> = ({ data }) => {
  const handleDeleteProduct = async () => {
    try {
      deleteProduct(data.id).then((res) => {
        fetches?.refetchProducts && fetches?.refetchProducts();
        fetches?.refetchOrders && fetches?.refetchOrders();
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
          <AlertDialogAction onClick={handleDeleteProduct}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductDeleteAlert;
