import React from "react";
// @ts-ignore
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import quotationMark from "../../assets/images/main-page/quotation-mark.svg";
import leftArrow from "../../assets/images/main-page/left-arrow.svg";
import rightArrow from "../../assets/images/main-page/right-arrow.svg";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const Team: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.team);

  const sliderBreakPoints = {
    0: {
      slidesPerView: "auto",
      coverflowEffect: {
        stretch: 0,
        depth: 1200,
      },
    },
    480: {
      slidesPerView: "auto",
      coverflowEffect: {
        stretch: -100,
        depth: 1200,
      },
    },
    750: {
      slidesPerView: 1.9,
      coverflowEffect: {
        stretch: -290,
        depth: 1200,
      },
    },
    1024: {
      // spaceBetween: 15/0,
      slidesPerView: 2,
      coverflowEffect: {
        stretch: -255,

        depth: 1200,
      },
    },
    1300: {
      slidesPerView: 2,
      coverflowEffect: {
        stretch: 6,
        depth: 450,
      },
    },
  };

  if (!data.length) return <></>;

  return (
    <div className="py-80">
      <h2 className="mb-40 title-2 text-center">Our Team</h2>
      <div className="container flex items-center dt:justify-center lt:w-full lt:px-0">
        <button className="team-slider-arrow left dt:hidden">
          <img src={leftArrow} alt="left-arrow" />
        </button>
        <Swiper
          className="max-w-[1060px] w-full team-swiper"
          grabCursor
          slidesPerView={2}
          modules={[EffectCoverflow, Navigation, Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          centeredSlides
          navigation={{
            prevEl: ".team-slider-arrow.left",
            nextEl: ".team-slider-arrow.right",
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            modifier: 1,
            slideShadows: false,
          }}
          loop={data.length >= 6}
          // @ts-ignore
          breakpoints={sliderBreakPoints}
        >
          {data.map((person, key) => (
            <SwiperSlide
              key={key}
              className="lt:w-[450px] slt:w-[340px] mbl:w-[280px]"
            >
              <div
                className="
                    relative pb-[21px] px-[24px] mx-auto w-[405px] h-[516px] flex flex-col justify-end bg-no-repeat bg-center bg-cover rounded-[8px] text-white before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(180deg,_rgba(0,0,0,0.00)_0%,_rgba(0,0,0,0.70)_100%)] before:rounded-[8px]
                    dt:w-[490px] dt:h-[586px] lt:w-full lt:h-[570px] slt:h-[460px]
                "
                style={{ backgroundImage: `url(${person.image})` }}
              >
                <h3 className="text-[24px] leading-[28px] font-medium z-10">
                  {person.name}
                </h3>
                <span className="flex items-center gap-[8px] mt-[4px] mb-[7px] text-[rgba(190,_190,_190,_1)] z-10">
                  {person.position} <span className="inline-block w-[4px] h-[4px] bg-[#BEBEBE] rounded-[50%]"></span> {person.experience}
                </span>
                <span className="flex items-center gap-[7px] text-[rgba(255,_184,_0,_1)] z-10">
                  <img src={quotationMark} alt="quotation-mark" />
                  <span>{person.quote}</span>
                </span>
                <p className="mt-[12px] z-10">{person.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="team-slider-arrow right dt:hidden">
          <img src={rightArrow} alt="right-arrow" />
        </button>
      </div>
    </div>
  );
};

export default Team;
