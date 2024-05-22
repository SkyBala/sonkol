import React from "react";
import Warning from "../ui/Warning";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IInput } from "../../hooks/useInput";

interface GroupToursProps {
  dateValue: IInput;
  scrollFunc: () => void;
}

const GroupTours: React.FC<GroupToursProps> = ({ dateValue, scrollFunc }) => {
  const { data } = useSelector((state: RootState) => state.tour);

  const onSelect = (selected: string) => {
    dateValue.onChangeOther(selected);
    scrollFunc();
  };

  return (
    <div className="mb-40 dt:mb-80">
      <h2 className="title-3">Group Tours</h2>
      <Warning className="my-20 pl-[5px] dt:pl-0 dt:my-[25px] mbl:text-start">
        The price per person varies depending on how many people in the group
      </Warning>
      <h3 className="text-[16px] leading-[18px] text-grey text-start">
        Tour dates
      </h3>
      <ul className="mt-10 [&>:not(:last-child)]:mb-10">
        {data.dates.map((date, key) => (
          <li className="flex justify-between items-center" key={key}>
            <span className="text-[18px] leading-[24px]">
              {date.date_from} - {date.date_up_to}
            </span>
            <button
              onClick={() => onSelect(`${date.date_from} - ${date.date_up_to}`)}
              className="btn"
            >
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupTours;
