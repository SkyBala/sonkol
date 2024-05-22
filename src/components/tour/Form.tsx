import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { IInput, useInput } from "../../hooks/useInput";
import Select from "../ui/Select";
import whatsapp from "../../assets/images/common/whatsapp.svg";
import whatsappHover from "../../assets/images/common/whatsapp-hover.svg";
import {
  // @ts-ignore
  Transition,
  // @ts-ignore
  SwitchTransition,
} from "react-transition-group";
import {
  setBookGroupTourStatus,
  setPrivateTourStatus,
} from "../../store/slices/tourSlice";
import loading from "../../assets/images/ui/loading.gif";
import Icon from "../ui/Icon";

interface FomrProps {
  title: string;
  className?: string;
  date: IInput;
  onSubmit: (
    name: string,
    email_or_whatsapp: string,
    date: number | string,
    date_str: string,
    tour: number
  ) => void;
  status: "" | "success" | "loading" | "error";
  isPrivate?: boolean;
}

const Form: React.FC<FomrProps> = ({
  title,
  className,
  date,
  onSubmit,
  status,
  isPrivate = false,
}) => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((store: RootState) => store.tour);
  const name = useInput("", { minLength: 2, isEmpty: true, isSWBL: true });
  const email = useInput("", { minLength: 4, isEmpty: true });
  const firstDate = useInput("", { minLength: 4, isEmpty: true });
  const [isValid, setIsValid] = useState(false);
  const [isBtnActive, setIsBtnActive] = useState(false);
  let successTimeout: number;

  const getOpacityAnimation = (state: string) =>
    state === "entering"
      ? "animate-[opacity-frame_0.2s_forwards]"
      : state === "exiting"
      ? "animate-[opacity-frame_0.2s_reverse_forwards]"
      : "";

  useEffect(() => {
    setIsValid(
      email.inputValid &&
        name.inputValid &&
        date.inputValid &&
        (isPrivate ? firstDate.inputValid : true)
    );
  }, [
    email.inputValid,
    name.inputValid,
    date.inputValid,
    firstDate.inputValid,
  ]);

  useEffect(() => {
    if (isValid && status !== "loading") setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [isValid, status]);

  useEffect(() => {
    if (status === "success" || status === "error") {
      // @ts-ignore
      successTimeout = setTimeout(
        () =>
          isPrivate
            ? dispatch(setPrivateTourStatus(""))
            : dispatch(setBookGroupTourStatus("")),
        4000
      );
    }

    return () => {
      clearTimeout(successTimeout);
    };
  }, [status]);

  const submitFunc = () => {
    onSubmit(
      name.value,
      email.value,
      isPrivate ? firstDate.value : 1,
      date.value,
      data.id
    );
    name.onChangeOther("");
    name.handleIsDirty(false);
    email.onChangeOther("");
    email.handleIsDirty(false);
    firstDate.onChangeOther("");
    firstDate.handleIsDirty(false);
  };

  return (
    <SwitchTransition mode="out-in">
      <Transition key={status} timeout={300}>
        {(state: string) =>
          status === "success" ? (
            <div
              className={`${getOpacityAnimation(
                state
              )} flex justify-center items-center min-h-[395px]`}
            >
              <span className="text-blueLight text-[24px] leading-[28px] text-center">
                Your request has been successfully submitted! Manager will
                contact you soon.
              </span>
            </div>
          ) : status === "error" ? (
            <div
              className={`${getOpacityAnimation(
                state
              )} flex justify-center items-center min-h-[395px]`}
            >
              <span className="text-red text-[24px] leading-[28px] text-center">
                Something is wrong
              </span>
            </div>
          ) : status === "loading" ? (
            <div
              className={`${getOpacityAnimation(
                state
              )} flex justify-center items-center min-h-[395px]`}
            >
              <img src={loading} alt="loading" />
            </div>
          ) : (
            <section
              className={`${className || ""} ${getOpacityAnimation(state)}`}
            >
              <h2 className="title-3">{title}</h2>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="my-20 text-start"
                action="/"
                method="post"
              >
                <div>
                  <h3 className="mb-[8px] text-[16px] leading-[18px] font-normal text-smooth">
                    Name
                  </h3>
                  <input
                    className={`inp ${name.errorMsg ? "error" : ""}`}
                    type="text"
                    value={name.value}
                    onChange={name.onChange}
                    onBlur={name.onBlur}
                  />
                  {name.errorMsg && (
                    <span className="error-msg">{name.errorMsg}</span>
                  )}
                </div>
                <div className="my-10">
                  <h3 className="mb-[8px] text-[16px] leading-[18px] font-normal text-smooth">
                    Leave your e-mail or Whatsapp
                  </h3>
                  <input
                    className={`inp ${email.errorMsg ? "error" : ""}`}
                    type="text"
                    value={email.value}
                    onChange={email.onChange}
                    onBlur={email.onBlur}
                  />
                  {email.errorMsg && (
                    <span className="error-msg">{email.errorMsg}</span>
                  )}
                </div>
                {isPrivate ? (
                  <>
                    <div>
                      <h3 className="mb-[8px] text-[16px] leading-[18px] font-normal text-smooth">
                        Select a date
                      </h3>
                      <input
                        className={`inp ${firstDate.errorMsg ? "error" : ""}`}
                        type="date"
                        value={firstDate.value}
                        onChange={firstDate.onChange}
                        onBlur={firstDate.onBlur}
                        placeholder="ДД.ММ.ГГ"
                      />
                    </div>
                    <div className="my-10">
                      <h3 className="mb-[8px] text-[16px] leading-[18px] font-normal text-smooth">
                        Select a date
                      </h3>
                      <input
                        className={`inp ${date.errorMsg ? "error" : ""}`}
                        type="date"
                        value={date.value}
                        onChange={date.onChange}
                        onBlur={date.onBlur}
                        placeholder="ДД.ММ.ГГ"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <h3 className="mb-[8px] text-[16px] leading-[18px] font-normal text-smooth">
                      Select a date
                    </h3>
                    <Select
                      value={date.value}
                      select={date.onChangeOther}
                      onBlur={date.onBlur}
                      placeholder="ДД/ММ/ГГ"
                      options={data.dates.map(
                        (date) => `${date.date_from} - ${date.date_up_to}`
                      )}
                      isError={!!date.errorMsg}
                    />
                  </div>
                )}
                {date.errorMsg && (
                  <span className="error-msg">{date.errorMsg}</span>
                )}
                <button
                  onClick={submitFunc}
                  disabled={!isBtnActive}
                  className="btn mt-20 disabled:disabled dt:mx-auto"
                >
                  Send
                </button>
                <span className="block mt-20 mb-[15px] dt:text-center">
                  Or write to us right now:
                </span>
                <a
                  className="dt:text-center"
                  href=""
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    src={whatsapp}
                    hoverSrc={whatsappHover}
                    className="w-[50px] h-[50px] dt:mx-auto"
                    alt="whatsapp"
                  />
                </a>
              </form>
            </section>
          )
        }
      </Transition>
    </SwitchTransition>
  );
};

export default Form;
