import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import toursSlice from "./slices/toursSlice";
import tourSlice from "./slices/tourSlice";
import reviewsSlice from "./slices/reviewsSlice";
import transportSlice from "./slices/transportSlice";
import blogNewsSlice from "./slices/blogNewsSlice";
import blogNewsAboutSlice from "./slices/blogNewsAboutSlice";
import questionsSlice from "./slices/questionsSlice";
import teamSlice from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    tours: toursSlice,
    tour: tourSlice,
    reviews: reviewsSlice,
    transport: transportSlice,
    blogNews: blogNewsSlice,
    blogNewsAbout: blogNewsAboutSlice,
    questions: questionsSlice,
    team: teamSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
