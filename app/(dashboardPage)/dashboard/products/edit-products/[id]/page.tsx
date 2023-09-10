import { getCategory } from "@/action/categories/getCategoryId";
import { getSingleProduct } from "@/action/products/getSingleProduct";
import EditProducts from "@/components/dashboard/products/edit-products/edit-product";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const result = await getSingleProduct(Number(id));
  const category = await getCategory();

  const product: any = {
    id: result.id,
    name: result.name,
    description: result.description,
    price: result.price,
    images: result.images,
    priceId: result.priceId,
    discount: result.discount,
    categoryId: result.categoryId,
    category: category,
    sizes: result.sizes,
  };

  return (
    <div className=" w-full">
      <EditProducts product={product} />
    </div>
  );
}
