import React, { useState, useEffect, useRef } from "react";
import { RootState, useAppDispatch } from "../store/store";
import { useParams } from "react-router-dom";
import {
  bookGroupTour,
  bookPrivateTour,
  getTour,
} from "../store/slices/tourSlice";
import { useSelector } from "react-redux";
import useMatchMedia from "use-match-media";
import Slider from "../components/tour/Slider";
import Program from "../components/tour/Program";
import Price from "../components/tour/Price";
import Tips from "../components/tour/Tips";
import Photo from "../components/tour/Photo";
import GroupTours from "../components/tour/GroupTours";
import Form from "../components/tour/Form";
import Reviews from "../components/tour/Reviews";
import Similar from "../components/tour/Similar";
import StatusCheck from "../components/ui/StatusCheck";
import { useInput } from "../hooks/useInput";

const Tour: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { status, bookGroupTourStatus, bookPrivateTourStatus, errorMsg } =
    useSelector((state: RootState) => state.tour);
  const groupTourForm = useRef<HTMLDivElement>(null);
  const aside = useRef<HTMLDivElement>(null);
  const groupTourDate = useInput("", { minLength: 4, isEmpty: true });
  const privateTourDate = useInput("", { minLength: 4, isEmpty: true });
  const [sticky, setSticky] = useState("");
  const isBigLT = useMatchMedia("(max-width: 1024px)");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    id && dispatch(getTour(+id));
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      const stickyBlock = aside.current;

      //@ts-ignore
      const asideHeight = stickyBlock?.firstChild.offsetHeight;
      const neighborHeight =
        //@ts-ignore
        stickyBlock?.previousElementSibling?.firstChild.offsetHeight;

      if (stickyBlock && !isBigLT && asideHeight <= neighborHeight) {
        const { top } = aside.current.getBoundingClientRect();

        if (window.innerHeight <= asideHeight + top) {
          setSticky("top");
        } else if (
          stickyBlock.parentElement &&
          scrollPosition +
            (asideHeight > window.innerHeight
              ? window.innerHeight
              : asideHeight) >=
            stickyBlock.parentElement?.offsetHeight +
              stickyBlock.parentElement?.offsetTop
        ) {
          setSticky("bottom");
        } else {
          setSticky("sticky");
        }
      } else setSticky("top");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const stickyBlock = aside.current;
    //@ts-ignore
    const asideHeight = stickyBlock?.firstChild.offsetHeight;
    const neighborHeight =
      //@ts-ignore
      stickyBlock?.previousElementSibling?.firstChild.offsetHeight;

    if (!(stickyBlock && !isBigLT && asideHeight <= neighborHeight))
      setSticky("");
  }, [
    //@ts-ignore
    aside.current?.firstChild.offsetHeight,
    //@ts-ignore
    aside.current?.previousElementSibling?.firstChild.offsetHeight,
    isBigLT,
  ]);

  const scrollToForm = () => {
    groupTourForm &&
      groupTourForm.current?.scrollIntoView({ behavior: "smooth" });
  };

  const bookGroupTourFunc = (
    name: string,
    email_or_whatsapp: string,
    date: number | string,
    date_str: string,
    tour: number
  ) => {
    dispatch(bookGroupTour({ name, email_or_whatsapp, date, date_str, tour }));
    groupTourDate.onChangeOther("");
    groupTourDate.handleIsDirty(false);
  };

  const bookPrivateTourFunc = (
    name: string,
    email_or_whatsapp: string,
    date: number | string,
    date_str: string,
    tour: number
  ) => {
    dispatch(
      bookPrivateTour({ name, email_or_whatsapp, date, date_str, tour })
    );
    privateTourDate.onChangeOther("");
    privateTourDate.handleIsDirty(false);
  };

  return (
    <StatusCheck status={status} errorMsg={errorMsg}>
      <Slider />
      <div className="container py-80 ">
        <div className="mb-80 flex justify-between gap-[45px] dt:flex-col dt:gap-[80px]">
          <section className="flex-[830px_0_0] dt:flex-grow">
            <div>
              <Program />
              <Price />
              <Tips />
              <Photo />
            </div>
          </section>
          <section
            ref={aside}
            className="relative flex-[0_0_405px] dt:max-w-[660px] dt:mx-auto dt:text-center"
          >
            <div
              className={`max-w-[405px] ${
                sticky === "sticky"
                  ? "fixed bottom-0"
                  : sticky === "bottom"
                  ? "absolute bottom-0"
                  : ""
              }`}
            >
              <GroupTours dateValue={groupTourDate} scrollFunc={scrollToForm} />
              <div ref={groupTourForm}>
                <Form
                  title="Book your spot in a group tour"
                  className="mb-80"
                  date={groupTourDate}
                  onSubmit={bookGroupTourFunc}
                  status={bookGroupTourStatus}
                />
              </div>
              <Form
                title="Private tour"
                date={privateTourDate}
                onSubmit={bookPrivateTourFunc}
                status={bookPrivateTourStatus}
                isPrivate
              />
            </div>
          </section>
        </div>
        <Reviews />
        <Similar />
      </div>
    </StatusCheck>
  );
};

export default Tour;
