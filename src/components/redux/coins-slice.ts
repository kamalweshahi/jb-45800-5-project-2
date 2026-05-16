import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Coin from "../models/Coin";

interface CoinsState {
  coins: Coin[];
  selectedCoins: Coin[];
  dialogOpen: boolean;
}

const initialState: CoinsState = {
  coins: [],
  selectedCoins: JSON.parse(localStorage.getItem("selectedCoins") || "[]"),
  dialogOpen: false,
};

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<Coin[]>) {
      state.coins = action.payload;
    },

    addSelectedCoin(state, action: PayloadAction<Coin>) {
      state.selectedCoins.push(action.payload);
      localStorage.setItem(
        "selectedCoins",
        JSON.stringify(state.selectedCoins),
      );
    },

    removeSelectedCoin(state, action: PayloadAction<string>) {
      state.selectedCoins = state.selectedCoins.filter(
        (coin) => coin.id !== action.payload,
      );
      localStorage.setItem(
        "selectedCoins",
        JSON.stringify(state.selectedCoins),
      );
    },

    openDialog(state) {
      state.dialogOpen = true;
    },

    closeDialog(state) {
      state.dialogOpen = false;
    },
  },
});

export const {
  setCoins,
  addSelectedCoin,
  removeSelectedCoin,
  openDialog,
  closeDialog,
} = coinsSlice.actions;

export default coinsSlice.reducer;
