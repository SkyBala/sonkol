import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { $api } from "../../http";
import { IBlogNews } from "../../@types";

interface MyKnownError {
  errorMessage: string;
}

export const getBlogNewsAbout = createAsyncThunk<
  IBlogNews,
  { id: number; similarBlogsLimit: number; category: string },
  { rejectValue: MyKnownError; state: RootState }
>(
  "blog-news-about",
  async ({ id, similarBlogsLimit, category }, { rejectWithValue }) => {
    try {
      const { data } = await $api(`blog/blog/${id}`);
      const similarData = await $api(`blog/blog/`, {
        params: {
          keyword: data.title,
          limit: similarBlogsLimit,
          category,
        },
      });
      const similar = similarData.data.results.filter(
        (blogNews: IBlogNews) => blogNews.title !== data.title
      );

      if (!data)
        return rejectWithValue({ errorMessage: "This blog does not exist" });

      return { ...data, similar: similar };
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue({ errorMessage: error.message });
    }
  }
);

interface BlogNewsAboutSliceState {
  status: "" | "success" | "loading" | "error";
  errorMsg: string;
  data: IBlogNews;
}

const initialState: BlogNewsAboutSliceState = {
  status: "",
  errorMsg: "",
  data: {
    id: 0,
    title: "",
    category: "Blog",
    date_posted: "",
    image: "",
    content: null,
    similar: [],
  },
};

const blogNewsAboutSlice = createSlice({
  name: "blogNewsAboutSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogNewsAbout.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getBlogNewsAbout.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(getBlogNewsAbout.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Someone went wrong";
    });
  },
});

export default blogNewsAboutSlice.reducer;
