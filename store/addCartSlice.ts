import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  product: string[];
  isExist: boolean;
}

const initialState: InitialStateProps = {
  product: [],
  isExist: false,
};

const addProductCartSlice = createSlice({
  initialState,
  name: "addCart",
  reducers: {
    setProduct: (state, actions: PayloadAction<string>) => {
      const isExit = state.product.find((item) => item === actions.payload);
      if (!isExit) {
        state.product.push(actions.payload);
      } else {
        state.isExist = true;
      }
    },
    removeProduct: (state, actions: PayloadAction<string>) => {
      state.product = state.product.filter((item) => item !== actions.payload);
    },
  },
});

export const { setProduct, removeProduct } = addProductCartSlice.actions;
export default addProductCartSlice.reducer;
