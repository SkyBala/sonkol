import React, { useState, useEffect, useCallback, useRef } from "react";
import { RootState, useAppDispatch } from "../store/store";
import { getCars, getTaxi, setOffset } from "../store/slices/transportSlice";
import { useSelector } from "react-redux";
import useMatchMedia from "use-match-media";
import StatusCheck from "../components/ui/StatusCheck";
import Card from "../components/transport/Card";
import Pagination from "../components/ui/Pagination";
import TaxiCard from "../components/transport/TaxiCard";
import map from "../assets/images/transport/map.jpg";
import Warning from "../components/ui/Warning";

const Transport: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    status,
    message,
    data,
    offset,
    limit,
    count,
    taxiData,
    taxiStatus,
    taxiMessage,
  } = useSelector((state: RootState) => state.transport);
  const aside = useRef<HTMLElement>(null);
  const [sticky, setSticky] = useState("top");
  const getPagesCount = () => Math.ceil(count / limit);
  const [activeTaxiBody, setActiveTaxiBody] = useState(0);
  const [nav, setNav] = useState("cars");
  const isLt = useMatchMedia("(max-width: 1024px)");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(getTaxi());
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      const stickyBlock = aside.current;
      if (stickyBlock && !isLt) {
        const stickyOffsetTop = stickyBlock.offsetTop;

        if (scrollPosition + 20 <= stickyOffsetTop) {
          setSticky("top");
        } else if (
          stickyBlock.parentElement &&
          //@ts-ignore
          scrollPosition +
            //@ts-ignore
            (stickyBlock.firstChild.offsetHeight > window.innerHeight
              ? window.innerHeight
              : //@ts-ignore
                stickyBlock.firstChild.offsetHeight) >=
            stickyBlock.parentElement?.offsetHeight +
              stickyBlock.parentElement?.offsetTop
        ) {
          setSticky("bottom");
        } else {
          setSticky("sticky");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(getCars());
  }, [offset, limit]);

  const onChangePage = useCallback((newPage: number) => {
    dispatch(setOffset((newPage - 1) * limit));
  }, []);

  return (
    <div className="container pt-[140px] pb-80">
      <h1 className="title-2 color-black text-[#000000] slt:text-[34px] slt:leading-[40px]">
        Transport
      </h1>
      <nav className="hidden lt:block my-50 slt:mt-30">
        <ul className="flex justify-center gap-[50px]">
          <li>
            <button
              onClick={() => setNav("cars")}
              className="text-[34px] leading-[40px] text-smooth slt:text-[24px] slt:leading-[28px]"
            >
              Car rental
            </button>
            {nav === "cars" && (
              <div className="rounded-[6px] h-[6px] bg-[#3C3C3C] "></div>
            )}
          </li>
          <li>
            <button
              onClick={() => setNav("taxi")}
              className="text-[34px] leading-[40px] text-smooth slt:text-[24px] slt:leading-[28px]"
            >
              Taxi
            </button>
            {nav === "taxi" && (
              <div className="rounded-[6px] h-[6px] bg-[#3C3C3C] "></div>
            )}
          </li>
        </ul>
      </nav>
      <div className="mt-80 flex justify-between gap-[30px] lt:justify-center">
        {(isLt && nav !== "cars") || (
          <section className="flex-[0_1_845px]">
            <h2 className="text-[36px] leading-[42px] font-normal lt:hidden">
              Car rental
            </h2>
            <StatusCheck
              status={status}
              errorMsg={message}
              loadingStyles="min-h-[50vh]"
            >
              <ul className="mt-40 lt:mt-0 [&>:not(:last-child)]:mb-40">
                {data.map((car) => (
                  <li key={car.id}>
                    <Card {...car} />
                  </li>
                ))}
              </ul>
            </StatusCheck>
          </section>
        )}
        {(isLt && nav !== "taxi") || (
          <section
            ref={aside}
            className="relative flex-[0_1_405px] lt:flex-[0_1_685px]"
          >
            <div
              className={`max-w-[405px] lt:max-w-none ${
                sticky === "sticky"
                  ? "fixed top-[20px]"
                  : sticky === "bottom"
                  ? "absolute bottom-0"
                  : ""
              }`}
            >
              <h2 className="text-[36px] leading-[42px] font-normal lt:hidden">
                Taxi
              </h2>
              <StatusCheck
                status={taxiStatus}
                errorMsg={taxiMessage}
                loadingStyles="min-h-[50vh]"
              >
                <ul className="mt-40 lt:mt-0 [&>:not(:last-child)]:mb-[13px]">
                  {taxiData.map((taxi) => (
                    <li key={taxi.id}>
                      <TaxiCard
                        {...taxi}
                        isOpen={activeTaxiBody === taxi.id}
                        setIsOpen={(id: number) => setActiveTaxiBody(id)}
                      />
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    maxHeight: activeTaxiBody ? 0 : 250,
                  }}
                  className="my-20 animate-def overflow-hidden flex items-center"
                >
                  <img className="w-full object-cover " src={map} alt="map" />
                </div>
                <Warning>
                  If you need another route, please contact us. We will try to
                  find a taxi for you
                </Warning>
              </StatusCheck>
            </div>
          </section>
        )}
      </div>
      {(isLt && nav !== "cars") || (
        <Pagination
          page={Math.ceil((offset + 1) / limit)}
          limit={getPagesCount()}
          change={onChangePage}
          className="mt-80 justify-center"
        />
      )}
    </div>
  );
};

export default Transport;
