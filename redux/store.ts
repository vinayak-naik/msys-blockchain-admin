import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux-toolkit/counterSlice";
import contractReducer from "./redux-toolkit/contractSlice";
import matchesReducer from "./redux-toolkit/matchesSlice";
import lotteriesReducer from "./redux-toolkit/lotteriesSlice";
import usersReducer from "./redux-toolkit/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contract: contractReducer,
    matches: matchesReducer,
    lotteries: lotteriesReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
