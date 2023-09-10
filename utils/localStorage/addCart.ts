import { ProductType } from "@/types";
import getCart from "./getCart";
import setCart from "./setCart";

type Props = Omit<ProductType, "categoryId"> & {
  selectedSize: string;
  totalPrice: number;
  quantity: number;
};
const addToCart = (product: Props) => {
  const availableProducts = getCart();

  const productIndex = availableProducts.findIndex(
    (item: any) =>
      item.id === product.id && item.selectedSize === product.selectedSize
  );
  if (productIndex !== -1) {
    availableProducts[productIndex].quantity = product.quantity;
    availableProducts[productIndex].selectedSize = product?.selectedSize;
    setCart(availableProducts);
  } else {
    const newProducts = [...availableProducts, product];
    setCart(newProducts);
  }
};

export default addToCart;
