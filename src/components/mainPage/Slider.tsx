import React, { useEffect, useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// @ts-ignore
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import clock from "../../assets/images/tours/clock.svg";
import person from "../../assets/images/tours/person.svg";
import price from "../../assets/images/tours/price.svg";
import calendar from "../../assets/images/tours/calendar.svg";
import "./styleTour/slider.css"

const Slider: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tours);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    data.length && setActiveIndex(data[0]?.id);
  }, [data]);

  const onSlideChange = (swiper: SwiperType) => {
    swiper.slides[swiper.activeIndex]?.dataset.id &&
      // @ts-ignore
      setActiveIndex(+swiper.slides[swiper.activeIndex]?.dataset.id || 0);
  };

  const swiperBreakPoints = {
    768: {
      slidesPerView: 2.3,
    },
    480: {
      slidesPerView: 2.1,
    },
  };

  if (data.length)
    return (
      <section className="h-[720px] relative text-white ldt:h-[calc(100vh+400px)] ldt:max-h-[930px]">
        {data.map((tour) => (
          <div
            style={{
              backgroundImage: `url(http://${tour.images[0]})`,
              opacity: tour.id === activeIndex ? 1 : 0,
            }}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat shadow-[inset_0_0_100px_100vw_rgba(0,_0,_0,_0.3)] animate-def"
            key={tour.id}
          ></div>
        ))}
        <div className="absolute top-[265px] left-0 w-full z-[100] h-[calc(100%_-_265px)] ldt:h-full ldt:top-0 ldt:pb-80">
          <div className="h-full container flex justify-between gap-[30px] ldt:flex-col ldt:items-center">
            <div className="relative flex-[0_0_625px] z-10 ldt:flex-[1_1_200px] ldt:flex ldt:items-center">
              {data
                .filter((tour) => tour.id === activeIndex)
                .map((tour) => (
                  <div key={tour.id}>
                    <div className="flex items-center gap-[40px] whitespace-nowrap ldt:justify-center slt:grid slt:grid-cols-[repeat(2,_minmax(0,auto))] slt:gap-[20px]">
                      <div className="flex items-center gap-[4px]">
                        <img src={clock} alt="clock" />
                        <span>{tour.tour_time}</span>
                      </div>
                      <div className="flex items-center gap-[4px]">
                        <img src={person} alt="clock" />
                        <span>{tour.number_of_people} pax</span>
                      </div>
                      <div className="flex items-center gap-[4px]">
                        <img src={price} alt="clock" />
                        <span>{tour.price}$</span>
                      </div>
                      <div className="flex items-center gap-[4px]">
                        <img src={calendar} alt="clock" />
                        <span>{tour.when_is_tour}</span>
                      </div>
                    </div>
                    <h2 className="my-10 text-[54px] leading-[63px] font-medium ldt:text-center lt:text-[40px] lt:leading-[47px] slt:text-[34px] slt:leading-[40px]">
                      {tour.name}
                    </h2>
                    <span className="text-[18px] leading-[21px] ldt:block ldt:text-center">
                      {tour.description}
                    </span>
                    <div className="mt-20 flex gap-[40px] ldt:justify-center slt:gap-[20px]">
                      <Link
                        className="btn slt:px-[24px]"
                        to={`/tour/${tour.id}`}
                      >
                        Learn more
                      </Link>
                      <Link
                        className="btn slt:px-[24px] transparent"
                        to={`/tours`}
                      >
                        More tours
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              className="pt-[80px] main-swiper overflow-visible ldt:w-full"
              onSlideChange={onSlideChange}
              modules={[Autoplay, Navigation]}
              navigation
              watchSlidesProgress
              slideVisibleClass="swiper-slide-visible"
              loop={data.length > 2}
              speed={500}
              breakpoints={swiperBreakPoints}
            >
              {(data.length >= 2 ? [...data, ...data] : data).map(
                (tour, index) => (
                  <SwiperSlide key={`${tour.id}${index}`} data-id={tour.id}>
                    <div
                      style={{
                        backgroundImage: `url(http://${tour.images[0]}`,
                      }}
                      className="relative rounded-[8px] p-10 w-full h-[235px] flex flex-col justify-end bg-cover bg-no-repeat bg-center animate-def before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(180deg,_rgba(0,0,0,0.00)_0%,_rgba(0,0,0,0.70)_100%)] before:rounded-[8px] slt:h-[170px] "
                    >
                      <h3 className="mb-10 text-16 leading-[18px] font-normal z-10">
                        {tour.name}
                      </h3>
                      <span className="text-[24px] leading-[28px] font-medium slt:text-[20px] slt:leading-[23px] z-10">
                        {tour.price}$
                      </span>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </div>
      </section>
    );

  return <></>;
};

export default Slider;
