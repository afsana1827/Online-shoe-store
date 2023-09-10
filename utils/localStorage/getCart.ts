const getCart = (): any[] => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } else {
    return [];
  }
};

export default getCart;
