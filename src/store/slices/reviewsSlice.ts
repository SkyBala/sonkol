import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";
import { IReview } from "../../@types";
import { RootState } from "../store";

interface MyKnownError {
  errorMessage: string;
}

export const getReviews = createAsyncThunk<
  IReview[],
  number | undefined,
  { rejectValue: MyKnownError; state: RootState }
>("reviews", async (limit, { rejectWithValue, getState }) => {
  try {
    const { reviews } = getState();
    const { data } = await $api("actions/comment/", {
      params: {
        limit: limit || reviews.limit,
        offset: reviews.offset,
        [reviews.tour ? "tour" : ""]: reviews.tour,
      },
    });

    const customedData = data.results?.map((review: any) => {
      return {
        ...review,
        date: {
          year: review.date.split("-")[0],
          month: review.date.split("-")[1],
          day: review.date.split("-")[2].slice(0, 2),
        },
      };
    });

    return customedData;
  } catch (error) {
    if (error instanceof Error)
      return rejectWithValue({ errorMessage: error.message });
  }
});

interface IReviewForm {
  name: string;
  stars: number;
  text: string;
  photos: File[];
  tour: string;
}

export const sendReview = createAsyncThunk<
  void,
  IReviewForm,
  { rejectValue: MyKnownError }
>(
  "send-review",
  async ({ name, stars, text, photos, tour }, { rejectWithValue }) => {
    try {
      let photosData = {};
      //@ts-ignore
      photos.forEach((photo: File, index) => (photosData[index + ""] = photo));

      await $api.post(
        "actions/comment/",
        {
          name,
          stars,
          text,
          upload_images: photosData,
          tour,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return;
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export type Sort = "-stars" | "date" | "-date";

interface ReviewsSliceState {
  count: number;
  data: IReview[];
  status: "" | "loading" | "success" | "error";
  formStatus: "" | "loading" | "success" | "error";
  formErrorMsg: string;
  sortBy: Sort;
  tour: number;
  offset: number;
  limit: number;
}

const initialState: ReviewsSliceState = {
  count: 0,
  data: [],
  status: "",
  formStatus: "",
  formErrorMsg: "",
  sortBy: "-stars",
  tour: 0,
  offset: 0,
  limit: 10,
};

const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<Sort>) {
      state.sortBy = action.payload;
    },
    setTour(state, action: PayloadAction<number>) {
      state.tour = action.payload;
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setFormStatus(
      state,
      action: PayloadAction<"" | "loading" | "success" | "error">
    ) {
      state.formStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(getReviews.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(sendReview.pending, (state) => {
      state.formStatus = "loading";
    });
    builder.addCase(sendReview.fulfilled, (state) => {
      state.formStatus = "success";
    });
    builder.addCase(sendReview.rejected, (state) => {
      state.formStatus = "error";
      state.formErrorMsg = "Something went wrong";
    });
  },
});

export const { setSortBy, setTour, setOffset, setLimit, setFormStatus } =
  reviewsSlice.actions;
export default reviewsSlice.reducer;
