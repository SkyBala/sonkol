import React from "react";
import Accordeon from "../ui/Accordeon";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Tips: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tour);

  if (!data.tips) return <></>;

  return (
    <section className="pt-30">
      <Accordeon title={<h2 className="pl-10 title-2 smbl:pl-0">Tips</h2>}>
        <div className="pl-40 pb-20 bottom-line tb:pl-30 smbl:pl-0">
          <h3 className="mb-20 text-[24px] leading-[24px]">
            {data.tips.tittle}
          </h3>
          <ul className="[&>:not(:last-child)]:mb-20">
            {data.tips.what_to_bring.map((tip, key) => (
              <li
                key={key}
                className="pl-10 flex items-center leading-[18px] before:content-[''] before:mr-20 before:block before:w-[11px] before:h-[11px] before:bg-blue before:rounded-[50%]"
              >
                {tip}
              </li>
            ))}
          </ul>
          <h3 className="mt-[25px] mb-10 text-[24px] leading-[24px]">
            {data.tips.tittle_2}
          </h3>
          <p>{data.tips.description}</p>
        </div>
      </Accordeon>
    </section>
  );
};

export default Tips;
