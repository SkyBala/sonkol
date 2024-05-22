import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ToursList from "../ToursList";
import useMatchMedia from "use-match-media";

const Similar: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tour);
  const isMBL = useMatchMedia("(max-width: 480px)");

  return (
    <section>
      <h2 className="title-2 text-black">Similar Tours</h2>
      <ToursList data={data.similarTours} isSlider={isMBL} className="mt-20" />
    </section>
  );
};

export default Similar;
