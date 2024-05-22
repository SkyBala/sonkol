import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";
import { ITeamPerson } from "../../@types";

interface MyKnownError {
  errorMessage: string;
}

export const getTeam = createAsyncThunk<
  ITeamPerson[],
  void,
  { rejectValue: MyKnownError }
>("team", async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api("main_page/our_team/");

    return data.results;
  } catch (e) {
    if (e instanceof Error) return rejectWithValue({ errorMessage: e.message });
  }
});

interface TeamSliceState {
  data: ITeamPerson[];
  status: "" | "loading" | "success" | "error";
}

const initialState: TeamSliceState = {
  data: [],
  status: "",
};

const teamSlice = createSlice({
  name: "teamSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeam.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload
    });
    builder.addCase(getTeam.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default teamSlice.reducer;
