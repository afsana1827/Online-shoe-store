import getCart from "./getCart";
import setCart from "./setCart";

const removeFromCart = (id: number, selectedSize: string) => {
  const availableProducts = getCart();
  const remainingProducts = availableProducts.findIndex(
    (item) => item.id === id && item.selectedSize === selectedSize
  );
  if (remainingProducts !== -1) {
    availableProducts.splice(remainingProducts, 1);
    setCart(availableProducts);
  }
};
export default removeFromCart;
