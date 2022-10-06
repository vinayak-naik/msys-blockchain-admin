import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { guides: [], guide: {} };

export const guideSlice = createSlice({
  name: "guide",
  initialState,
  reducers: {
    setGuides: (state: any, action: PayloadAction<any>) => {
      state.guides = action.payload;
    },
    setGuide: (state: any, action: PayloadAction<any>) => {
      state.guide = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGuides, setGuide } = guideSlice.actions;

export default guideSlice.reducer;
