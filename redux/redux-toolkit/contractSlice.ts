import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { contract: null, signer: null };

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setContract: (state: any, action: PayloadAction<any>) => {
      state.contract = action.payload;
    },
    setNftContract: (state: any, action: PayloadAction<any>) => {
      state.nftContract = action.payload;
    },
    setSigner: (state: any, action: PayloadAction<any>) => {
      state.signer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContract, setNftContract, setSigner } = contractSlice.actions;

export default contractSlice.reducer;
