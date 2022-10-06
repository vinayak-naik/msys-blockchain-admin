import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = { articles: [], article: {} };

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticles: (state: any, action: PayloadAction<any>) => {
      state.articles = action.payload;
    },
    setArticle: (state: any, action: PayloadAction<any>) => {
      state.article = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setArticles, setArticle } = articleSlice.actions;

export default articleSlice.reducer;
