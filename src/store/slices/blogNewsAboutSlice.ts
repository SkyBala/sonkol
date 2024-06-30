import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { $api } from "../../http"
import { IBlogNews } from "../../@types"

interface MyKnownError {
  errorMessage: string
}

export const getBlogNewsAbout = createAsyncThunk<
  IBlogNews,
  { id: number; similarBlogsLimit: number; category: string },
  { rejectValue: MyKnownError; state: RootState }
>("blog-news-about", async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await $api(`/blog_news/${id}`)

    if (!data) return rejectWithValue({ errorMessage: "This blog does not exist" })

    return { ...data }
  } catch (error) {
    if (error instanceof Error) return rejectWithValue({ errorMessage: error.message })
  }
})

interface BlogNewsAboutSliceState {
  status: "" | "idle" | "loading" | "succeeded" | "failed"
  errorMsg: string
  data: IBlogNews
}

const initialState: BlogNewsAboutSliceState = {
  status: "",
  errorMsg: "",
  data: {
    id: 0,
    title: "",
    category: "Блог",
    created_at: "",
    image: "",
    content: null,
    slides: [],
    similar: [],
  },
}

const blogNewsAboutSlice = createSlice({
  name: "blogNewsAboutSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogNewsAbout.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(getBlogNewsAbout.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.data = action.payload
    })
    builder.addCase(getBlogNewsAbout.rejected, (state, action) => {
      state.status = "failed"
      state.errorMsg = action.payload?.errorMessage || "Someone went wrong"
    })
  },
})

export default blogNewsAboutSlice.reducer
