import React from "react";
import { ITourCard } from "../@types";
import TourCard from "./tourCard/TourCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ToursListProps {
  data: ITourCard[];
  isSlider?: boolean;
  className?: string;
}

const ToursList: React.FC<ToursListProps> = ({
  data,
  isSlider = false,
  className = "",
}) => {
  if (!data.length) return <span>There is nothing here yet</span>;

  if (isSlider)
    return (
      <Swiper slidesPerView={2.1} spaceBetween={10} className={className}>
        {data.map((tour, key) => (
          <SwiperSlide key={key}>
            <TourCard {...tour} className="h-[290px] max-w-[215px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    );

  return (
    <div
      className={`mt-40 grid grid-cols-2 gap-[30px] slt:gap-[20px] tb:grid-cols-1 ${className}`}
    >
      {data.map((tour, key) => (
        <TourCard key={key} {...tour} />
      ))}
    </div>
  );
};

export default ToursList;
