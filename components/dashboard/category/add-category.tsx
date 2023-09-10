"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import addCategory from "@/action/categories/addCategory";
import { toast } from "react-hot-toast";

export const CategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string(),
});
export type CategoryType = z.infer<typeof CategorySchema>;
const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit = async (data: CategoryType) => {
    try {
      await addCategory(data);
      toast.success("Category Added");
      reset();
    } catch (error) {
      toast.error("Something went wrong", error.message);
      console.log(error);
    }
  };

  return (
    <form
      className="flex items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" w-1/2 mt-8 p-5 bg-theme-light-green shadow-md rounded space-y-5">
        <div className="text-theme-deep-blue space-y-1">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>{" "}
          </Label>
          <Input
            {...register("name")}
            type="text"
            placeholder="Category Name"
          />
          <p className=" text-red-500">{errors.name?.message}</p>
        </div>
        <div className="text-theme-deep-blue space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input
            {...register("description")}
            type="text"
            placeholder="Description"
          />
        </div>

        <Button
          className=" dark:bg-orange-500 dark:text-white dark:hover:bg-orange-700 "
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "loading..." : "Add Category"}
        </Button>
      </div>
    </form>
  );
};

export default AddCategory;
