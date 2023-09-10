import { ProductType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Props = Omit<ProductType, "categoryId"> & {
  selectedSize: string;
  totalPrice: number;
  quantity: number;
};
interface InitialStateProps {
  wishList: Props[];
  isExist: boolean;
}

const initialState: InitialStateProps = {
  wishList: [],
  isExist: false,
};

const addWishListCartSlice = createSlice({
  initialState,
  name: "addWishList",
  reducers: {
    setWishList: (state, actions: PayloadAction<Props>) => {
      const isExit = state.wishList.find(
        (item) => item.id === actions.payload.id
      );
      if (!isExit) {
        state.wishList.push(actions.payload);
      } else {
        state.wishList = state.wishList.filter(
          (item) => item.id !== actions.payload.id
        );
        state.isExist = true;
      }
    },
    removeWishList: (state, actions: PayloadAction<number>) => {
      state.wishList = state.wishList.filter(
        (item) => item.id !== actions.payload
      );
    },

    setClearWishList: (state) => {
      state.wishList = [];
    },
  },
});

export const { setWishList, removeWishList, setClearWishList } =
  addWishListCartSlice.actions;
export default addWishListCartSlice.reducer;
