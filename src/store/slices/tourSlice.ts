import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";
import { IReview, ITourCard, Tour } from "../../@types";

interface MyKnownError {
  errorMessage: string;
}

export const getTour = createAsyncThunk<
  Tour,
  number,
  { rejectValue: MyKnownError }
>("tour", async (id, { rejectWithValue }) => {
  try {
    const { data } = await $api(`tour/TourAdd/${id}`);
    const program = await $api("tour/TourProgram/", { params: { tour: id } });
    const dates = await $api(`tour/TourDate/`);
    const similarData = await $api("tour/TourAdd/", {
      params: { keyword: data.name, limit: 4 },
    });
    const similar = similarData.data?.results.filter(
      (tour: ITourCard) => tour.name !== data.name
    );
    const reviewsData = await $api(`actions/comment/`);
    const reviews = reviewsData?.data.results.filter(
      (review: IReview) => review.tour === data.name
    );

    return {
      ...data,
      program: program?.data,
      dates: dates?.data.results.filter(
        (program: { tour: string }) => program.tour === data.name
      ),
      reviews: reviews?.slice(0, 2) || [],
      reviewsCount: reviews?.length || 0,
      similarTours: similar?.results || [],
    };
  } catch (e) {
    if (e instanceof Error) return rejectWithValue({ errorMessage: e.message });
  }
});

export interface GroupTourForm {
  name: string;
  email_or_whatsapp: string;
  date: number | string;
  date_str: string;
  tour: number;
}

export const bookGroupTour = createAsyncThunk<
  void,
  GroupTourForm,
  { rejectValue: MyKnownError }
>("book-group-tour", async (form, { rejectWithValue }) => {
  try {
    await $api.post("tour/BookingGroupTour/", form);
  } catch (e) {
    if (e instanceof Error) return rejectWithValue({ errorMessage: e.message });
  }
});

export const bookPrivateTour = createAsyncThunk<
  void,
  GroupTourForm,
  { rejectValue: MyKnownError }
>("book-private-tour", async (form, { rejectWithValue }) => {
  try {
    await $api.post("tour/BookingPrivateTour/", {
      ...form,
      date_up_to: form.date_str,
    });
  } catch (e) {
    if (e instanceof Error) return rejectWithValue({ errorMessage: e.message });
  }
});

interface TourSliceState {
  data: Tour;
  status: "" | "loading" | "success" | "error";
  errorMsg: string;
  bookGroupTourStatus: "" | "loading" | "success" | "error";
  bookPrivateTourStatus: "" | "loading" | "success" | "error";
}

const initialState: TourSliceState = {
  data: {
    id: 0,
    name: "",
    description: "",
    images: [],
    tour_time: "",
    number_of_people: 0,
    price: 0,
    when_is_tour: "",
    program: [],
    photos: { images: [] },
    dates: [],
    prices: {
      price_includes: [],
      price_not_includes: [],
    },
    price_details: [],
    tips: {
      tittle: "",
      what_to_bring: [],
      tittle_2: "",
      description: "",
    },
    reviews: [],
    reviewsCount: 0,
    similarTours: [],
    type: "",
    types: [],
  },
  status: "",
  errorMsg: "",
  bookGroupTourStatus: "",
  bookPrivateTourStatus: "",
};

const tourSlice = createSlice({
  name: "tourSlice",
  initialState,
  reducers: {
    setBookGroupTourStatus(
      state,
      action: PayloadAction<"" | "loading" | "success" | "error">
    ) {
      state.bookGroupTourStatus = action.payload;
    },
    setPrivateTourStatus(
      state,
      action: PayloadAction<"" | "loading" | "success" | "error">
    ) {
      state.bookPrivateTourStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTour.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTour.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(getTour.rejected, (state, action) => {
      state.status = "error";
      state.errorMsg = action.payload?.errorMessage || "Something went wrong";
    });
    builder.addCase(bookGroupTour.pending, (state) => {
      state.bookGroupTourStatus = "loading";
    });
    builder.addCase(bookGroupTour.fulfilled, (state) => {
      state.bookGroupTourStatus = "success";
    });
    builder.addCase(bookGroupTour.rejected, (state) => {
      state.bookGroupTourStatus = "error";
    });
    builder.addCase(bookPrivateTour.pending, (state) => {
      state.bookPrivateTourStatus = "loading";
    });
    builder.addCase(bookPrivateTour.fulfilled, (state) => {
      state.bookPrivateTourStatus = "success";
    });
    builder.addCase(bookPrivateTour.rejected, (state) => {
      state.bookPrivateTourStatus = "error";
    });
  },
});

export const { setBookGroupTourStatus, setPrivateTourStatus } =
  tourSlice.actions;
export default tourSlice.reducer;
