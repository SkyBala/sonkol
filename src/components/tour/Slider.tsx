import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
// @ts-ignore
import { Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import clock from "../../assets/images/tours/clock.svg";
import person from "../../assets/images/tours/person.svg";
import price from "../../assets/images/tours/price.svg";
import calendar from "../../assets/images/tours/calendar.svg";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";
import "./style.css"

const Slider: React.FC = () => {
  const { data } = useSelector((store: RootState) => store.tour);

  return (
    <section className="tour-swiper relative">
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
      >
        <div className="absolute top-0 left-0 w-full min-h-[600px] flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover text-center text-white shadow-[inset_0_0_100px_100vw_rgba(0,_0,_0,_0.40)] z-30 pointer-events-none">
          <h2 className="mb-80 font-medium mbl:text-[34px] mbl:leading-[40px] mbl:font-normal">{data.name}</h2>
          <div className="flex gap-[40px] whitespace-nowrap mbl:flex-col mbl:gap-[20px] mbl:text-14">
            <div className="flex gap-[40px] mbl:gap-[20px]">
              <div className="flex gap-[4px] items-center">
                <img src={clock} alt="clock" />
                <span>{data.tour_time}</span>
              </div>
              <div className="flex gap-[4px] items-center whitespace-nowrap">
                <img src={person} alt="person" />
                <span>{data.number_of_people} pax</span>
              </div>
            </div>
            <div className="pl-[5px] flex gap-[40px] mbl:gap-[20px]">
              <div className="flex gap-[4px] items-center whitespace-nowrap">
                <img src={price} alt="price" />
                <span>{data.price}</span>
              </div>
              <div className="flex gap-[4px] items-center whitespace-nowrap">
                <img src={calendar} alt="calendar" />
                <span>{data.when_is_tour}</span>
              </div>
            </div>
          </div>
        </div>
        {data.images?.map((image, key) => (
          <SwiperSlide key={key}>
            <div
              style={{
                backgroundImage: `url(http://${image})`,
              }}
              className="w-full sliderSnadow min-h-[600px] bg-center bg-no-repeat bg-cover"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
