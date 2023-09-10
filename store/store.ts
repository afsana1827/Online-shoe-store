"use client";
import cartSlice from "./cartSlice";
import addCartSlice from "./addCartSlice";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import addWishListSlice from "./addWishListSlice";
import selectedSizeSlice from "./selectedSizeSlice";

export const store = configureStore({
  reducer: {
    addProductCart: addCartSlice,
    cart: cartSlice,
    addWishList: addWishListSlice,
    selectedSizes: selectedSizeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
