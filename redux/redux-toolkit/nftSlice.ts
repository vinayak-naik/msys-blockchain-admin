import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { nfts: [], nft: {} };

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setNfts: (state: any, action: PayloadAction<any>) => {
      state.nfts = action.payload;
    },
    setNft: (state: any, action: PayloadAction<any>) => {
      state.nft = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNfts, setNft } = nftSlice.actions;

export default nftSlice.reducer;
