import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { users: [] };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state: any, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
