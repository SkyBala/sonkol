import React, { useEffect } from "react";
import { getReviews } from "../store/slices/reviewsSlice";
import { useSelector } from "react-redux";
import Form from "../components/reviews/Form";
import Content from "../components/reviews/Content";
import StatusCheck from "../components/ui/StatusCheck";
import { RootState, useAppDispatch } from "../store/store";
import { getTours } from "../store/slices/toursSlice";

const Reviews: React.FC = () => {
  const dispatch = useAppDispatch();
  const toursStatus = useSelector((state: RootState) => state.tours.status);
  const { sortBy, tour, offset, status } = useSelector(
    (state: RootState) => state.reviews
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    dispatch(getTours());
  }, []);

  useEffect(() => {
    dispatch(getReviews());
  }, [sortBy, tour, offset]);

  const getStatus = () => {
    if (status === "loading" || toursStatus === "loading") return "loading";
    if (status === "error" || toursStatus === "error") return "error";
    else return "success";
  };

  return (
    <div className="container pt-[140px] pb-80">
      <h1>Reviews</h1>
      <Form />
      <StatusCheck status={getStatus()}>
        <Content />
      </StatusCheck>
    </div>
  );
};

export default Reviews;
