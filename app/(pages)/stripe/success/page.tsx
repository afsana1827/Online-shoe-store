"use client";

import { Button } from "@/components/ui/button";
import { setProduct } from "@/store/addCartSlice";
import { useAppDispatch } from "@/store/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
function SuccessPage() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if ((id || id.startsWith("cs_")) && typeof window !== "undefined") {
      localStorage.clear();
      dispatch(setProduct("1"));
    } else {
      router.push("/");
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center py-10 h-[50vh]">
      <div className="text-center space-y-5">
        <h2 className="text-green-500 text-4xl font-semibold">
          Payment Successful
        </h2>
        <h3>Your order has been placed successfully</h3>
        <Link href="/" className="pt-10 block">
          <Button>Shop More</Button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;
