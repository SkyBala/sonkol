import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";
import { IBlogNews } from "../../@types";
import { RootState } from "../store";

interface MyKnownError {
  errorMessage: string;
}

export const getBlogsNews = createAsyncThunk<
  { count: number; results: IBlogNews[] },
  void,
  { rejectValue: MyKnownError; state: RootState }
>("blogsNews", async (_, { rejectWithValue, getState }) => {
  try {
    const { blogNews } = getState();
    const { data } = await $api("blog/blog/", {
      params: {
        search: blogNews.searchValue,
        offset: blogNews.offset,
        limit: blogNews.offset + blogNews.limit,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface BlogNewsSliceState {
  status: "" | "success" | "loading" | "error";
  count: number;
  offset: number;
  limit: number;
  data: IBlogNews[];
  searchValue: string;
}

const initialState: BlogNewsSliceState = {
  status: "",
  count: 0,
  offset: 0,
  limit: 10,
  data: [],
  searchValue: "",
};

const blogNewsSlice = createSlice({
  name: "blogNewsSlice",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogsNews.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getBlogsNews.fulfilled, (state, action) => {
      state.status = "success";
      state.count = action.payload.count;
      state.data = action.payload.results;
    });
    builder.addCase(getBlogsNews.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setSearchValue, setOffset } = blogNewsSlice.actions;
export default blogNewsSlice.reducer;
