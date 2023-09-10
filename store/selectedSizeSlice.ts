import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  selectedSizes: Array<{ size: string; quantity: number }>;
}

const initialState: InitialStateProps = {
  selectedSizes: [],
};

const selectedSizeSlice = createSlice({
  initialState,
  name: "selectedSize",
  reducers: {
    setSizesValue: (
      state,
      actions: PayloadAction<{ size: string; quantity: number }>
    ) => {
      state.selectedSizes.push(actions.payload);
    },
    deleteSizesValue: (state, actions: PayloadAction<string>) => {
      state.selectedSizes = state.selectedSizes.filter(
        (item) => item.size !== actions.payload
      );
    },

    setSizesQuantity: (
      state,
      actions: PayloadAction<{ size: string; quantity: number }>
    ) => {
      state.selectedSizes = state.selectedSizes.map((item) => {
        if (item.size === actions.payload.size) {
          item.quantity = actions.payload.quantity;
        }
        return item;
      });
    },

    setDefaultSizes: (
      state,
      actions: PayloadAction<Array<{ size: string; quantity: number }>>
    ) => {
      state.selectedSizes = actions.payload;
    },
  },
});

export const {
  setSizesValue,
  deleteSizesValue,
  setSizesQuantity,
  setDefaultSizes,
} = selectedSizeSlice.actions;
export default selectedSizeSlice.reducer;
