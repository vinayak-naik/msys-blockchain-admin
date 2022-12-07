import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  userContract: null,
  bettingContract: null,
  lotteryContract: null,
  nftContract: null,
  gameContract: null,
  signer: null,
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setUserContract: (state: any, action: PayloadAction<any>) => {
      state.userContract = action.payload;
    },
    setBettingContract: (state: any, action: PayloadAction<any>) => {
      state.bettingContract = action.payload;
    },
    setLotteryContract: (state: any, action: PayloadAction<any>) => {
      state.lotteryContract = action.payload;
    },
    setNftContract: (state: any, action: PayloadAction<any>) => {
      state.nftContract = action.payload;
    },
    setGameContract: (state: any, action: PayloadAction<any>) => {
      state.gameContract = action.payload;
    },
    setSigner: (state: any, action: PayloadAction<any>) => {
      state.signer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserContract,
  setBettingContract,
  setLotteryContract,
  setNftContract,
  setGameContract,
  setSigner,
} = contractSlice.actions;

export default contractSlice.reducer;
