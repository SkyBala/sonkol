import React from "react";
import { IReview } from "../../@types";
import star from "../../assets/images/common/star.svg";
import starActive from "../../assets/images/common/star-active.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { months } from "../../uttilities";
import { API_URL } from "../../http";
// @ts-ignore

const Card: React.FC<IReview> = ({ name, stars, text, photos, date }) => {
  const swiperImgBreakpoints = {
    1024: {
      slidesPerView: 3,
    },
  };

  return (
    <div>
      <h3 className="text-18 leading-[21px] font-medium">{name}</h3>
      <div className="mt-[8px] mb-[22px] flex gap-[10px] items-center">
        {[...new Array(5)].map((_, key) => (
          <img
            key={key}
            src={stars - (key + 1) >= 0 ? starActive : star}
            alt="star"
            className="w-[24px] h-[24px]"
          />
        ))}
        <span className="text-blueLight text-[24px] leading-[28px] font-medium">
          {stars}
        </span>
      </div>
      <p className="whitespace-normal overflow-hidden text-ellipsis">{text}</p>
      <Swiper
        breakpoints={swiperImgBreakpoints}
        slidesPerView={1}
        spaceBetween={10}
        className="mt-10 mb-20"
        loop
      >
        {(photos.length >= 3 ? [...photos, ...photos] : photos).map(
          (image, key) => (
            <SwiperSlide
              key={key}
              className="max-w-[420px] h-[295px] rounded-[4px] overflow-hidden lt:max-w-none lt:h-auto"
            >
              <img
                src={`${API_URL}${image}`}
                alt="review"
                className="rounded-[4px] mx-auto h-full object-cover max-w-[420px] max-h-[305px]"
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
      <span className="block text-end text-[14px] leading-[16px] text-[#707070]">
        {months[date.month - 1]} {date.day}, {date.year}
      </span>
    </div>
  );
};

export default Card;
