export const getDiscountedPricePercentage = (
  originalPrice,
  discountedPrice
) => {
  const discountPercentage = (discountedPrice / originalPrice) * 100;
  return discountPercentage.toFixed(2);
};
