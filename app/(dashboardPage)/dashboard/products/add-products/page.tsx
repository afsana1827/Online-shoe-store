"use client";
import { getCategory } from "@/action/categories/getCategoryId";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProductSchema, ProductType } from "@/types";
import { uploadImages } from "@/utils/uploadImages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import addProduct from "@/action/products/addProduct";
import { createPrice } from "@/action/stripe/stripe";
import SelectedMultipleSize from "@/components/dashboard/products/SelectedMultipleSize";
import { fetches } from "@/lib/refetch";

export default function AddProducts() {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors, isValid, isSubmitting },
  } = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit = async (data: ProductType) => {
    try {
      const price = data?.price - (data?.discount || 0);
      const priceId = await createPrice(price);
      await ProductSchema.parseAsync(data);
      await addProduct({ ...data, priceId });

      toast.success("Product Added");
      reset();
      setPreview(null);
      setValue("sizes", []);
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Something went wrong", error.message);
      console.log(error);
    }
  };

  //  data fecthing for section
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["get-category"],
    queryFn: getCategory,
  });
  fetches.refetchOrders = refetch;
  if (isLoading) {
    return <p> category data is loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-full flex flex-col items-center justify-center "
    >
      <div className=" space-y-8 h-auto w-2/3 shadow-lg py-5 px-10 rounded dark:bg-gray-900">
        <h5 className=" text-center">Add Product</h5>
        <div className=" flex items-center gap-5 ">
          {/* for name */}
          <div className=" w-full">
            <Label htmlFor="name">Product Name</Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Enter your product name"
              className="mt-1  "
            />
            <p className=" text-red-500"> {errors.name?.message} </p>
          </div>
          {/* for quantity */}
          <div className=" w-full">
            <Label htmlFor="sizes">Select Size</Label>
            <SelectedMultipleSize setValue={setValue} />
            <p className=" text-red-500"> {errors.sizes?.message} </p>
          </div>
        </div>
        <div className=" flex items-center gap-5 ">
          {/* for price */}
          <div className=" w-full">
            <Label htmlFor="price">Product Price</Label>
            <Input
              type="text"
              {...register("price", {
                valueAsNumber: true,
              })}
              placeholder="Enter your product price"
              className="mt-1  "
            />
            <p className=" text-red-500"> {errors.price?.message} </p>
          </div>
          {/* for discount */}
          <div className=" w-full">
            <Label htmlFor="discount">Discount</Label>
            <Input
              {...register("discount", {
                valueAsNumber: true,
              })}
              type="text"
              placeholder="Enter your discount price"
              className="mt-1  "
            />
            <p className=" text-red-500"> {errors.discount?.message} </p>
          </div>
        </div>

        <div className=" flex gap-5 ">
          <div className=" w-1/2">
            <Label htmlFor="categoryId">Select Category</Label>
            <Select
              onValueChange={(value) => {
                setValue("categoryId", Number(value));
              }}
            >
              <SelectTrigger className=" focus:ring-offset-0 focus:ring-0">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((item, index) => {
                  return (
                    <div key={index}>
                      <SelectItem value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    </div>
                  );
                })}
              </SelectContent>
            </Select>
            <p className=" text-red-500"> {errors.categoryId?.message} </p>
          </div>

          <div className=" flex-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Enter your description"
              className="mt-1  "
            />
            <p className=" text-red-500"> {errors.description?.message} </p>
          </div>
        </div>

        {/* for image */}
        <div>
          {preview && (
            <div className=" relative w-40 h-40 object-contain">
              <Image src={preview} fill alt="" />
            </div>
          )}
          <Input
            className=" flex items-center focus-visible:outline-orange-500 "
            type="file"
            accept="image/*"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files.length !== 0) {
                const file: File = e.target.files[0];
                setPreview(URL.createObjectURL(file));

                const { url } = await uploadImages(
                  file,
                  setUploadProgress,
                  "organic"
                );

                setValue("images", [url], {
                  shouldTouch: true,
                  shouldValidate: true,
                  shouldDirty: true,
                });

                setPreview(url);
                setUploadProgress(null);
              }
            }}
          />
          <p className=" text-red-500"> {errors.images?.message} </p>
        </div>

        {uploadProgress !== null && (
          <div>
            <Progress value={uploadProgress} />
          </div>
        )}

        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          className="dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600"
        >
          {!isSubmitting ? (
            <span>Submit</span>
          ) : (
            <span className="flex items-center gap-1">
              <span>Submitting...</span>
              <FiLoader className="animate-spin" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}
