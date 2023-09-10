import { getCategoryBySlug } from "@/action/categories/getCategoryBySlug";
import CategoryFilterData from "../components/CategoryFilterData";

const Category = async ({ params: { slug } }: { params: { slug: string } }) => {
  const result = await getCategoryBySlug(slug);

  return <CategoryFilterData result={result} />;
};

export default Category;
