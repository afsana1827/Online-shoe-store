"use client";
import { getOrderByPaymentId } from "@/action/order/getOrderByPaymentId";
import { updatedManyProduct } from "@/action/products/updateManyProduct";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectPage() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const { isLoading } = useQuery({
    queryKey: ["get-order"],
    queryFn: async () => await getOrderByPaymentId(id),
    onSuccess: async (data) => {
      const orderData = JSON.parse(JSON.stringify(data));
      await updatedManyProduct(orderData?.items?.products);
      router.push(`/stripe/success?id=${id}`);
    },
    onError: (error) => {
      router.push(`/stripe/success?id=${id}`);
    },
  });
  if (isLoading) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        Please Wait! Page Redirecting...
      </div>
    );
  }

  return (
    <div className="h-[50vh] flex justify-center items-center">
      Please Wait! Page Redirecting...
    </div>
  );
}

export default RedirectPage;
