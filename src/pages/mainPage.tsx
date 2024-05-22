import React, { useEffect, useRef } from "react";
import Slider from "../components/mainPage/Slider";
import { Reviews } from "../components/mainPage/Reviews";
import About from "../components/mainPage/About";
import Questions from "../components/mainPage/Questions";
import { useLocation } from "react-router-dom";
import { RootState, useAppDispatch } from "../store/store";
import { getTours } from "../store/slices/toursSlice";
import { getReviews } from "../store/slices/reviewsSlice";
import StatusCheck from "../components/ui/StatusCheck";
import { useSelector } from "react-redux";
import Team from "../components/mainPage/Team";
import { getTeam } from "../store/slices/teamSlice";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const questionsRef = useRef<HTMLDivElement>(null);
  const toursStatus = useSelector((state: RootState) => state.tours.status);
  const reviewsStatus = useSelector((state: RootState) => state.reviews.status);
  const teamStatus = useSelector((state: RootState) => state.team.status)

  useEffect(() => {
    dispatch(getTours(4));
    dispatch(getReviews(2));
    dispatch(getTeam())
  }, []);

  useEffect(() => {
    if (location.search.includes("questions") && questionsRef)
      questionsRef.current?.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0 });
  }, [location.search]);

  const getStatus = () => {
    if (reviewsStatus === "loading" || toursStatus === "loading" || teamStatus === "loading")
      return "loading";
    if (reviewsStatus === "error" || toursStatus === "error" || teamStatus === "error") return "success";
    else return "success";
  };

  return (
    <StatusCheck status={getStatus()}>
      <div>
        <Slider />
        <div className="container py-80">
          <Reviews />
        </div>
        <About />
        <Team />
        <div ref={questionsRef}>
          <Questions />
        </div>
      </div>
    </StatusCheck>
  );
};

export default MainPage;
