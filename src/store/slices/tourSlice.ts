import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../../http";
import { IReview, ITourCard, Tour } from "../../@types";

interface MyKnownError {
  errorMessage: string;
}

// Async thunk to fetch tour details
export const getTour = createAsyncThunk<
  Tour,
  number,
  { rejectValue: MyKnownError }
>("tour/getTour", async (id, { rejectWithValue }) => {
  try {
    const { data } = await $api(`tour/${id}`);
      const [program, dates, similarData, reviewsData] = await Promise.all([
        $api("tour/TourProgram/", { params: { tour: id } }),
        $api(`tour/TourDate/`),
        $api("tour/TourAdd/", { params: { keyword: data.name, limit: 4 } }),
        $api(`actions/comment/`),
      ]);

    const similarTours = similarData.data?.results.filter(
      (tour: ITourCard) => tour.name !== data.name
    ) || [];

    const reviews = reviewsData.data?.results.filter(
      (review: IReview) => review.tour === data.name
    ) || [];

    return {
      ...data,
      program: program.data,
      dates: dates.data.results.filter((date: { tour: string }) => date.tour === data.name),
      reviews: reviews.slice(0, 2),
      reviewsCount: reviews.length,
      similarTours,
    };
  } catch (e) {
    if (e instanceof Error) return rejectWithValue({ errorMessage: e.message });
  }
});

// Group tour booking form interface
export interface GroupTourForm {
  name: string;
  email_or_whatsapp: string;
  date: number | string;
  date_str: string;
  tour: number;
}

// Async thunk to book a group tour
export const bookGroupTour = createAsyncThunk<
  void,
  GroupTourForm,
  { rejectValue: MyKnownError }
>("tour/bookGroupTour", async (form, { rejectWithValue }) => {
  try {
    await $api.post("tour/BookingGroupTour/", form);
  } catch (e) {
    if (e instanceof Error) return rejectWithValue({ errorMessage: e.message });
  }
});

// Async thunk to book a private tour
export const bookPrivateTour = createAsyncThunk<
  void,
  GroupTourForm,
  { rejectValue: MyKnownError }
>("tour/bookPrivateTour", async (form, { rejectWithValue }) => {
  try {
    await $api.post("tour/BookingPrivateTour/", {
      ...form,
      date_up_to: form.date_str,
    });
  } catch (e) {
    if (e instanceof Error) return rejectWithValue({ errorMessage: e.message });
  }
});

// Initial state of the tour slice
interface TourSliceState {
  data: Tour;
  status: "idle" | "loading" | "succeeded" | "failed";
  errorMsg: string | null;
  bookGroupTourStatus: "idle" | "loading" | "succeeded" | "failed";
  bookPrivateTourStatus: "idle" | "loading" | "succeeded" | "failed";
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
  status: "idle",
  errorMsg: null,
  bookGroupTourStatus: "idle",
  bookPrivateTourStatus: "idle",
};

// Create the tour slice
const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setBookGroupTourStatus(state, action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">) {
      state.bookGroupTourStatus = action.payload;
    },
    setPrivateTourStatus(state, action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">) {
      state.bookPrivateTourStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTour.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(getTour.rejected, (state, action) => {
        state.status = "failed";
        state.errorMsg = action.payload?.errorMessage || "Something went wrong";
      })
      .addCase(bookGroupTour.pending, (state) => {
        state.bookGroupTourStatus = "loading";
      })
      .addCase(bookGroupTour.fulfilled, (state) => {
        state.bookGroupTourStatus = "succeeded";
      })
      .addCase(bookGroupTour.rejected, (state) => {
        state.bookGroupTourStatus = "failed";
      })
      .addCase(bookPrivateTour.pending, (state) => {
        state.bookPrivateTourStatus = "loading";
      })
      .addCase(bookPrivateTour.fulfilled, (state) => {
        state.bookPrivateTourStatus = "succeeded";
      })
      .addCase(bookPrivateTour.rejected, (state) => {
        state.bookPrivateTourStatus = "failed";
      });
  },
});

export const { setBookGroupTourStatus, setPrivateTourStatus } = tourSlice.actions;
export default tourSlice.reducer;
