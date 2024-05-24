import React from "react";
import { Link } from "react-router-dom";
import clock from "../../assets/images/tours/clock.svg";
import person from "../../assets/images/tours/person.svg";
import dollar from "../../assets/images/tours/price.svg";
import calendar from "../../assets/images/tours/calendar.svg";
import { ITourCard } from "../../@types";

interface TourCardProps extends ITourCard {
  className?: string;
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  name,
  tours,
  tour_time,
  number_of_people,
  price,
  when_is_tour,
  className = "",
}) => {
  return (
    <Link
      to={`/Tour/${id}`}
      style={{
        background: `url(${tours[0]?.image[0]}) no-repeat center`,
        backgroundSize: "cover",
      }}
      className={`relative w-full rounded-10 p-20 min-h-[405px] flex flex-col justify-end text-[#F3F3F3] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-[8px] before:bg-[linear-gradient(180deg,_rgba(217,217,217,0.00)_0%,_rgba(0,0,0,0.60)_100%)] lt:min-h-[300px] slt:max-w-[335px] slt:min-h-[215px] tb:justify-self-center mbl:max-w-none ${className}`}
    >
      <h4 className="mb-20 text-24 leading-[28px] font-normal lt:text-18 lt:leading-[24px] lt:mb-[4px] z-10">
        {name}
      </h4>
      <div className="flex gap-[40px] whitespace-nowrap lt:flex-col lt:gap-[12px] lt:text-14 z-10">
        <div className="flex gap-[40px] lt:gap-[20px]">
          <div className="flex gap-[4px]">
            <img src={clock} alt="clock" />
            <span>{tour_time}</span>
          </div>
          <div className="flex gap-[4px] whitespace-nowrap">
            <img src={person} alt="person" />
            <span>{number_of_people} pax</span>
          </div>
        </div>
        <div className="pl-[5px] flex gap-[40px] lt:gap-[20px]">
          <div className="flex gap-[4px] whitespace-nowrap">
            <img src={dollar} alt="price" />
            <span>{price}</span>
          </div>
          <div className="flex gap-[4px] whitespace-nowrap">
            <img src={calendar} alt="calendar" />
            <span>{when_is_tour}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
