import React from "react";
import { ITaxi } from "../../@types";
import Accordeon from "../ui/Accordeon";
import taxiArrows from "../../assets/images/transport/taxi-arrows.svg";
import taxi from "../../assets/images/transport/taxi.svg";

interface TaxiCardProps extends ITaxi {
  isOpen?: boolean;
  setIsOpen?: (id: number) => void;
}

const TaxiCard: React.FC<TaxiCardProps> = ({
  id,
  place_of_departure,
  place_of_arrival,
  name_taxi,
  price,
  how_hours,
  map,
  isOpen = true,
  setIsOpen,
}) => {
  const orderTaxi = () => {
    const message = "Hello! I want to order a taxi";
    const phone = "+996706990087"
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?phone=${phone}&text=${encodedMessage}`;

    window.location.href = whatsappUrl;
  };

  return (
    <Accordeon
      isArrow={false}
      spaceBetween={13}
      className="max-w-[405px] lt:max-w-none"
      isActive={isOpen}
      handleIsActive={() => setIsOpen?.(isOpen ? 0 : id)}
      title={
        <div className="flex flex-grow justify-between items-center gap-[8px]">
          <span className="rounded-[6px] p-10 flex-[0_1_185px] bg-[#D2DEE3] text-start lt:flex-grow">
            {place_of_departure}
          </span>
          <div>
            <img src={taxiArrows} alt="taxi-arrows" />
          </div>
          <span className="rounded-[6px] p-10 flex-[0_1_185px] bg-[#D2DEE3] text-start lt:flex-grow">
            {place_of_arrival}
          </span>
        </div>
      }
    >
      <div className="border border-[#D2DEE3] rounded-[8px] p-20 min-h-[180px] flex justify-between items-center bg-[#F6F7F7]">
        <div>
          <span className="block text-[18px] leading-[24px]">{name_taxi}</span>
          <span className="my-10 block text-[18px] leading-[24px] font-medium">
            {price} $
          </span>
          <span className="block text-[18px] leading-[24px]">
            {how_hours} hours
          </span>
          <button onClick={orderTaxi} className="btn mt-10" >
            Order
          </button>
        </div>
        <div>
          <img src={taxi} alt="taxi" />
        </div>
      </div>
      <div className="mt-20 max-h-[250px] overflow-hidden flex items-center">
        <img className="w-full object-center" src={map} alt="map" />
      </div>
    </Accordeon>
  );
};

export default TaxiCard;
