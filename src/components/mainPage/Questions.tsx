import React, { useEffect, useState } from "react";
import Accordeon from "../ui/Accordeon";
import { questions } from "../../uttilities";
import { useInput } from "../../hooks/useInput";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { sendQuestion, setStatus } from "../../store/slices/questionsSlice";
import {
  // @ts-ignore
  Transition,
  // @ts-ignore
  SwitchTransition,
} from "react-transition-group";
import loading from "../../assets/images/ui/loading.gif";

const Questions: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.questions.status);
  const question = useInput("", { minLength: 2, isEmpty: true });
  const contact = useInput("", { minLength: 2, isEmpty: true });
  const [isValid, setIsValid] = useState(false);
  const [isBtnActive, setIsBtnActive] = useState(false);
  let successTimeout: number;

  useEffect(() => {
    setIsValid(question.inputValid && contact.inputValid);
  }, [question.inputValid, contact.inputValid]);

  useEffect(() => {
    if (isValid && status !== "loading") setIsBtnActive(true);
    else setIsBtnActive(false);
  }, [isValid, status]);

  useEffect(() => {
    if (status === "success" || status === "error") {
      successTimeout = setTimeout(() => dispatch(setStatus("")), 4000);
    }

    return () => {
      clearTimeout(successTimeout);
    };
  }, [status]);

  const sendQuestionFunc = () => {
    dispatch(
      sendQuestion({ question_text: question.value, contact: contact.value })
    );
  };

  const getOpacityAnimation = (state: string) =>
    state === "entering"
      ? "animate-[opacity-frame_0.2s_forwards]"
      : state === "exiting"
      ? "animate-[opacity-frame_0.2s_reverse_forwards]"
      : "";

  return (
    <section className="py-80 container">
      <h2 className="title-2 text-center">Frequently asked questions</h2>
      <div className="mt-[65px] flex justify-between gap-[55px] lt:flex-col">
        <div className="flex-[0_1_805px] [&>:not(:last-child)]:mb-40 lt:flex-auto">
          {questions.map((question, key) => (
            <Accordeon
              key={key}
              title={
                <span className="text-[24px] leading-[28px] text-start slt:text-[20px] slt:leading-[23px]">
                  {question.question}
                </span>
              }
            >
              <p className="pl-20">
                {question.answer.split("*ENTER*").map((text, key) => (
                  <span key={key}>
                    {key > 0 && <br />}
                    {text}
                    <br />
                  </span>
                ))}
              </p>
            </Accordeon>
          ))}
        </div>
        <div className="flex-[0_1_405px] lt:flex-auto lt:mx-auto lt:max-w-[335px] lt:w-full">
          <SwitchTransition>
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
                  <>
                    <h3 className="mb-20 text-[24px] leading-[28px] text-center">
                      Ask a question
                    </h3>
                    <form
                      className="[&>:not(:last-child)]:mb-20"
                      onSubmit={(e) => e.preventDefault()}
                      action="/"
                      method="post"
                    >
                      <div>
                        <h4 className="mb-[8px]">Write your question</h4>
                        <input
                          value={question.value}
                          onChange={question.onChange}
                          onBlur={question.onBlur}
                          className={`inp ${question.errorMsg ? "error" : ""}`}
                          type="text"
                        />
                        {question.errorMsg && (
                          <span className="error-msg">{question.errorMsg}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="mb-[8px]">
                          Leave your E-mail or WhatsApp
                        </h4>
                        <input
                          value={contact.value}
                          onChange={contact.onChange}
                          onBlur={contact.onBlur}
                          className={`inp ${contact.errorMsg ? "error" : ""}`}
                          type="text"
                        />
                        {contact.errorMsg && (
                          <span className="error-msg">{contact.errorMsg}</span>
                        )}
                      </div>
                      <button
                        disabled={!isBtnActive}
                        onClick={sendQuestionFunc}
                        className="mx-auto btn disabled:disabled"
                      >
                        Send
                      </button>
                    </form>
                  </>
                )
              }
            </Transition>
          </SwitchTransition>
        </div>
      </div>
    </section>
  );
};

export default Questions;
