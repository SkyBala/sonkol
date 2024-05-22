import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import Select from "../ui/Select";
import Card from "./Card";
import {
  Sort,
  setOffset,
  setSortBy,
  setTour,
} from "../../store/slices/reviewsSlice";
import Pagination from "../ui/Pagination";

const Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const tours = useSelector((state: RootState) => state.tours.data);
  const { data, sortBy, tour, count, offset, limit } = useSelector(
    (state: RootState) => state.reviews
  );
  const sortOptions = ["New ones first", "Old ones first", "Highest rating"];
  const sortOptionsValue: Sort[] = ["-date", "date", "-stars"];
  const getPagesCount = () => Math.ceil(count / limit);

  const handleSortValue = (newValue: string) => {
    dispatch(
      setSortBy(
        sortOptionsValue[sortOptions.findIndex((value) => value === newValue)]
      )
    );
  };

  const handleTourValue = (newValue: string) => {
    dispatch(setTour((tours.find((tour) => tour.name === newValue)?.id) || 0));
  };

  const onChangePage = useCallback((newPage: number) => {
    dispatch(setOffset((newPage - 1) * 6));
  }, []);
  
  return (
    <div className="container mt-[120px]">
      <div>
        <h3 className="mb-[8px] text-[16px] leading-[18px] text-smooth">
          Sorting
        </h3>
        <Select
          options={sortOptions}
          value={
            sortOptions[sortOptionsValue.findIndex((value) => value === sortBy)]
          }
          select={handleSortValue}
          rootStyles="max-w-[625px]"
          activeOptionStyles="text-yellLight"
          isAbsolute
        />
      </div>
      <div className="mt-20">
        <h3 className="mb-[8px] text-[16px] leading-[18px] text-smooth">
          Tour
        </h3>
        <Select
          placeholder="Select item"
          options={["All", ...tours.map((tour) => tour.name)]}
          value={tours.find((obj) => obj.id === tour)?.name || "All"}
          select={handleTourValue}
          rootStyles="max-w-[625px]"
          activeOptionStyles="text-yellLight"
          isAbsolute
        />
      </div>
      <div className="mt-40 [&>:not(:last-child)]:mb-[77px]">
        {data.length ? data.map((review) => (
          <Card key={review.id} {...review} />
        )) : <span>There is nothing here yet.</span>}
      </div>
      <Pagination
        page={Math.ceil((offset + 1) / 6)}
        limit={getPagesCount()}
        change={onChangePage}
        className="mt-80 justify-center"
      />
    </div>
  );
};

export default Content;
