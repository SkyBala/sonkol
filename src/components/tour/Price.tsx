import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import checkMark from "../../assets/images/tour/check-mark.svg";
import cross from "../../assets/images/tour/cross.svg";
import { IPriceDetail } from "../../@types";

const Price: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tour);

  return (
    <section className="pt-30 pb-20 bottom-line">
      <h2 className="mb-20 title-2 pl-10 smbl:pl-0">Price</h2>
      {!data.prices && !data.price_details ? (
        <span className="pl-40 tb:pl-30 smbl:pl-0">
          There is hothing here yet
        </span>
      ) : (
        <div className="pl-40 tb:pl-30 smbl:pl-0">
          {data.prices && (
            <div className="mb-40 flex gap-[30px] tb:flex-col">
              <div className="flex-[0_1_385px] slt:flex-auto">
                <h3 className="mb-[25px] text-[18px] leading-[24px] font-normal whitespace-nowrap">
                  Price inclides:
                </h3>
                <ul className="[&>:not(:last-child)]:mb-20">
                  {data.prices?.price_includes.map((elem, key) => (
                    <li className="flex items-center gap-[12px]" key={key}>
                      <img src={checkMark} alt="check-mark" />
                      {elem}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-[25px] text-[18px] leading-[24px] font-normal whitespace-nowrap">
                  Price doesn't include:
                </h3>
                <ul className="[&>:not(:last-child)]:mb-20">
                  {data.prices.price_not_includes.map((elem, key) => (
                    <li className="flex items-center gap-[12px]" key={key}>
                      <img src={cross} alt="check-mark" />
                      {elem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {!!data.price_details.length && (
            <>
              <h3 className="mb-20 text-[24px] leading-[28px] font-normal">
                Price
              </h3>
              <div className="pl-20 flex gap-[50px] tb:gap-[10px] mbl:pl-0">
                <div className="pr-10 border-r border-gray border-solid text-center">
                  <h4 className="mb-20 text-[18px] tb:font-medium">
                    Person
                  </h4>
                  <ul className="[&>:not(:last-child)]:mb-20">
                    {data.price_details.map((detail: IPriceDetail, i) => (
                      <li key={i}>{detail.person}</li>
                    ))}
                  </ul>
                </div>
                <div className="pr-10 border-r border-gray border-solid text-center">
                  <h4 className="mb-20  text-[18px] tb:font-medium">
                    With basic English guides (KGS)
                  </h4>
                  <ul className="[&>:not(:last-child)]:mb-20">
                    {data.price_details.map((detail: IPriceDetail, i) => (
                      <li key={i}>{detail.in_com || "-"}</li>
                    ))}
                  </ul>
                </div>
                <div className="pr-10 border-r border-gray border-solid text-center tb:border-none">
                  <h4 className="mb-20  text-[18px] tb:font-medium">
                    With English speaking guides (KGS)
                  </h4>
                  <ul className="[&>:not(:last-child)]:mb-20">
                    {data.price_details.map((detail: IPriceDetail, i) => (
                      <li key={i}>{detail.per_person || "-"}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Price;
