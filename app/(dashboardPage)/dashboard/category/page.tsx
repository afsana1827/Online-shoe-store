import AddCategory from "@/components/dashboard/category/add-category";
import React from "react";

function CategoryPage() {
  return (
    <div>
      <h3 className=" text-theme-primary text-center text-xl font-semibold">
        Add Category
      </h3>
      <AddCategory />
    </div>
  );
}

export default CategoryPage;
