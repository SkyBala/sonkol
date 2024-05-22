import React from "react";
import { ICar } from "../../@types";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Navigation, Pagination } from "swiper";
import person from "../../assets/images/transport/person.svg";
import transmissionImg from "../../assets/images/transport/transmission.svg";
import "swiper/css";
import "swiper/css/navigation";
import Warning from "../ui/Warning";

const Card: React.FC<ICar> = ({
  images,
  name_car,
  status,
  capacity,
  transmission,
  steering_wheel,
  type_of_fuel,
  Type_of_drive,
  engine_capacity,
  power,
  configuration,
  consumption,
  per_kilometer,
  driver_comfort,
  how_days_driving_without_driver,
  how_days_driving_without_driver_2,
  how_days_driving_without_driver_3,
}) => {
  const bookCar = () => {
    console.log('ed')
    const message = "Hello. I want book a car";
    const phone = "+996706990087"
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?phone=${phone}&text=${encodedMessage}`;

    window.location.href = whatsappUrl;
  };

  return (
    <div className="max-w-[845px]">
      <Swiper
        className="cars-swiper w-full"
        slidesPerView="auto"
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {images.map((image, key) => (
          <SwiperSlide
            className="rounded-[6px] overflow-hidden"
            key={key}
          >
            <img
              className="w-full outline-none max-h-[515px]"
              src={`http://${image}`}
              alt="car"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="my-[20px] flex justify-between items-center">
        <h3 className="text-[36px] leading-[42px] lt:text-[24px] lt:leading-[28px]">
          {name_car}
        </h3>
        <span
          style={{
            color: status === "Available" ? "#10CB00" : "red",
          }}
          className="font-medium"
        >
          Status: {status}
        </span>
      </div>
      <div className="flex gap-[20px]">
        <div className="flex">
          <img src={person} alt="person" />
          <span className="ml-[8px]">{capacity}</span>
        </div>
        <div className="flex">
          <img src={transmissionImg} alt="transmission" />
          <span className="ml-[4px]">{transmission}</span>
        </div>
      </div>
      <div className="mt-20 mb-30 flex justify-between items-center gap-[30px] text-start slt:flex-col">
        <ul className="flex-[0_1_405px] [&>:not(:last-child)]:mb-[26px] slt:flex-auto slt:w-full">
          <li className="flex justify-between items-center">
            <h4 className="font-medium">Steering wheel</h4>
            <span className="w-[120px]">{steering_wheel}</span>
          </li>
          <li className="flex justify-between items-center">
            <h4 className="font-medium">Type of fuel</h4>
            <span className="w-[120px]">{type_of_fuel}</span>
          </li>
          <li className="flex justify-between items-center">
            <h4 className="font-medium">Type of drive</h4>
            <span className="w-[120px]">{Type_of_drive}</span>
          </li>
          <li className="flex justify-between items-center">
            <h4 className="font-medium">Engine capacity</h4>
            <span className="w-[120px]">{engine_capacity} liters</span>
          </li>
          <li className="flex justify-between items-center">
            <h4 className="font-medium">Power</h4>
            <span className="w-[120px]">{power}</span>
          </li>
          <li className="flex justify-between items-center">
            <h4 className="font-medium">Configuration</h4>
            <span className="w-[120px]">{configuration}</span>
          </li>
          <li className="flex justify-between items-center">
            <h4 className="font-medium">Consumption</h4>
            <span className="w-[120px]">{consumption}</span>
          </li>
        </ul>
        <div className="flex-grow slt:flex-auto slt:w-full">
          <span className="block py-10 rounded-[6px_6px_0_0] text-smooth text-center text-[18px] leading-[24px] bg-[#99D3EA]">
            With driver
          </span>
          <ul className="pt-[8px] pb-20 px-[8px] [&>:not(:last-child)]:mb-[16px]">
            <li className="flex justify-between ">
              <h4 className="font-medium max-w-[297px] slt:max-w-none">
                Per kilometer
              </h4>
              <span>{per_kilometer}$</span>
            </li>
            <li className="flex justify-between">
              <h4 className="font-medium max-w-[297px] slt:max-w-none">
                Driver's food and accommodation for 1 day
              </h4>
              <span>{driver_comfort}$</span>
            </li>
          </ul>
          <Warning
            imgStyles="w-[25px] h-[25px]"
            textStyles="text-[16px] leading-[18px]"
          >
            For pricing please contact us
          </Warning>
          <span className="block mt-20 py-10 rounded-[6px_6px_0_0] text-smooth text-center text-[18px] leading-[24px] bg-[#99D3EA]">
            Without driver
          </span>
          <ul className="pt-[8px] pb-20 px-[8px] [&>:not(:last-child)]:mb-[16px]">
            <li className="flex justify-between ">
              <h4 className="font-medium max-w-[297px]">1-3 days</h4>
              <span>{how_days_driving_without_driver}$</span>
            </li>
            <li className="flex justify-between">
              <h4 className="font-medium max-w-[297px]">4-5 days</h4>
              <span>{how_days_driving_without_driver_2}$</span>
            </li>
            <li className="flex justify-between">
              <h4 className="font-medium max-w-[297px]">8 or more days</h4>
              <span>{how_days_driving_without_driver_3}$</span>
            </li>
          </ul>
        </div>
      </div>
      <button onClick={bookCar} className="btn px-[56px]">
        Book
      </button>
    </div>
  );
};

export default Card;
