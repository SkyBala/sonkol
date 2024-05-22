import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICar, ITaxi } from "../../@types";
import { $api } from "../../http";

interface MyKnownError {
  errorMessage: string;
}

export const getCars = createAsyncThunk<
  { count: number; results: ICar[] },
  void,
  { rejectValue: MyKnownError; state: RootState }
>("cars", async (_, { rejectWithValue, getState }) => {
  try {
    const { transport } = getState();
    const { data } = await $api("car/CarRental/", {
      params: {
        offset: transport.offset,
        limit: transport.offset + transport.limit,
      },
    });

    if (!data.results.length)
      return rejectWithValue({ errorMessage: "There is nothing here yet." });

    return data;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

export const getTaxi = createAsyncThunk<
  { results: ITaxi[] },
  void,
  { rejectValue: MyKnownError }
>("taxi", async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api("car/Taxi/");

    if (!data.results.length)
      return rejectWithValue({ errorMessage: "There is nothing here yet." });

    return data;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface TransportSliceState {
  status: "" | "success" | "loading" | "error";
  message: string;
  taxiStatus: "" | "success" | "loading" | "error";
  taxiMessage: string;
  count: number;
  data: ICar[];
  taxiData: ITaxi[];
  offset: number;
  limit: number;
}

const initialState: TransportSliceState = {
  status: "",
  message: "",
  taxiStatus: "",
  taxiMessage: "",
  count: 0,
  data: [],
  taxiData: [],
  offset: 0,
  limit: 5,
};

const transportSlice = createSlice({
  name: "transportSlice",
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTaxi.pending, (state) => {
      state.taxiStatus = "loading";
    });
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload.results;
      state.count = action.payload.count;
    });
    builder.addCase(getTaxi.fulfilled, (state, action) => {
      state.taxiStatus = "success";
      state.taxiData = action.payload.results;
    });
    builder.addCase(getCars.rejected, (state, action) => {
      state.status = "error";
      state.message = action.payload?.errorMessage || "";
    });
    builder.addCase(getTaxi.rejected, (state, action) => {
      state.taxiStatus = "error";
      state.taxiMessage = action.payload?.errorMessage || "";
    });
  },
});

export const { setOffset } = transportSlice.actions;
export default transportSlice.reducer;
