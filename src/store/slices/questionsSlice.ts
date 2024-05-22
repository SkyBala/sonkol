import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";

interface MyKnownError {
  errorMessage: string;
}

export const sendQuestion = createAsyncThunk<
  void,
  { question_text: string; contact: string },
  { rejectValue: MyKnownError }
>("questions", async ({ question_text, contact }, { rejectWithValue }) => {
  try {
    await $api.post("main_page/questions/", { question_text, contact });
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface QuestionsSliceState {
  status: "" | "success" | "loading" | "error";
}

const initialState: QuestionsSliceState = {
  status: "",
};

const questionsSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    setStatus(
      state,
      action: PayloadAction<"" | "success" | "loading" | "error">
    ) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendQuestion.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(sendQuestion.fulfilled, (state) => {
      state.status = "success";
    });
    builder.addCase(sendQuestion.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { setStatus } = questionsSlice.actions;
export default questionsSlice.reducer;
