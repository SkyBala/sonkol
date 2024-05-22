import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";
import { ITourCard, Tour } from "../../@types";

interface MyKnownError {
  errorMessage: string;
}

export const getTours = createAsyncThunk<
  { data: ITourCard[]; types: string[] },
  number | undefined,
  { rejectValue: MyKnownError }
>(
  "tours/getTours",
  async (limit, { rejectWithValue }) => {
    try {
      const { data } = await $api("Tour/", {
        params: {
          limit: limit ?? undefined,
        },
      });

      if (!data.results.length) {
        return rejectWithValue({ errorMessage: "There is nothing here yet." });
      }

      const types: string[] = [];
      data.results.forEach((tour: ITourCard) => {
        if (!types.includes(tour.type)) {
          types.push(tour.type);
        }
      });

      return { data: data.results, types };
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue({ errorMessage: e.message });
      }
      return rejectWithValue({ errorMessage: "An unknown error occurred" });
    }
  }
);

interface ToursSliceState {
  status: "" | "loading" | "success" | "error";
  message: string;
  data: ITourCard[];
  types: string[];
}

const initialState: ToursSliceState = {
  status: "",
  message: "",
  data: [],
  types: [],
};

const toursSlice = createSlice({
  name: "toursSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTours.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.types = action.payload.types;
        state.status = "success";
        state.message = "";
      })
      .addCase(getTours.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload?.errorMessage || "An error occurred";
      });
  },
});

export default toursSlice.reducer;
