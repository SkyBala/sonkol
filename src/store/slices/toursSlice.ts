import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { $api } from "../../http"
import { ITourCard } from "../../@types"

interface MyKnownError {
  errorMessage: string
}

export const getTours = createAsyncThunk<
  { data: Partial<ITourCard>[]; types: string[] },
  number | undefined,
  { rejectValue: MyKnownError }
>("tours/getTours", async (limit, { rejectWithValue }) => {
  try {
    const { data } = await $api("Tour/", {
      params: {
        limit: limit ?? undefined,
      },
    })

    if (!data.results.length) {
      return rejectWithValue({ errorMessage: "There is nothing here yet." })
    }

    const types: string[] = []
    data.results.forEach((tour: ITourCard) => {
      if (tour.type) {
        if (!types.includes(tour.type)) {
          types.push(tour.type)
        }
      }
    })

    return { data: data.results, types }
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue({ errorMessage: e.message })
    }
    return rejectWithValue({ errorMessage: "An unknown error occurred" })
  }
})

interface ToursSliceState {
  status: "" | "idle" | "loading" | "succeeded" | "failed"
  message: string
  data: ITourCard[]
  types: string[]
}

const initialState: ToursSliceState = {
  status: "",
  message: "",
  data: [],
  types: [],
}

const toursSlice = createSlice({
  name: "toursSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTours.pending, (state) => {
        state.status = "loading"
        state.message = ""
      })
      .addCase(getTours.fulfilled, (state, action) => {
        //@ts-ignore
        state.data = action.payload.data
        state.types = action.payload.types
        state.status = "succeeded"
        state.message = ""
      })
      .addCase(getTours.rejected, (state, action) => {
        state.status = "failed"
        state.message = action.payload?.errorMessage || "An error occurred"
      })
  },
})

export default toursSlice.reducer
