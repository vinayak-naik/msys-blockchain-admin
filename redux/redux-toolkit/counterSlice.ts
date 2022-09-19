import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  counterValue: number;
}

const initialState: CounterState = {
  counterValue: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: any, action: PayloadAction<number>) => {
      state.counterValue += action.payload;
    },
    decrement: (state: any, action: PayloadAction<number>) => {
      state.counterValue -= action.payload;
    },
    incrementByAmount: (state: any, action: PayloadAction<number>) => {
      state.counterValue += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
