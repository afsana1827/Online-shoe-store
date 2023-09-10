const setCart = (data: any) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

export default setCart;
