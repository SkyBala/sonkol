import React, { useEffect, useState } from "react";
import StageForm from "./StageForm";
import { useInput } from "../../hooks/useInput";
import { RootState, useAppDispatch } from "../../store/store";
import { sendReview, setFormStatus } from "../../store/slices/reviewsSlice";
import { useSelector } from "react-redux";
import loading from "../../assets/images/ui/loading.gif";

export interface Stages {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
}

const Form: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.reviews.formStatus);
  const [stages, setStages] = useState({
    first: "active",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
  });
  const [stageNumber, setStageNumber] = useState(1);
  const [stars, setStars] = useState(0);
  const name = useInput("", { isEmpty: false, minLength: 2 });
  const description = useInput("", {
    isEmpty: false,
    minLength: 1,
    maxLength: 1000,
  });
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const feedBack = useInput("", { isEmpty: true, minLength: 2 });
  const inputs = [name, description, images, feedBack];
  let sendFormTimeout: number;

  useEffect(() => {
    Object.keys(stages).forEach((elem, i) => {
      //@ts-ignore
      stages[elem] === "active" && setStageNumber(i + 1);
    });
  }, [stages]);

  useEffect(() => {
    if (status === "success" || status === "error")
      sendFormTimeout = setTimeout(() => dispatch(setFormStatus("")), 4000);
    return () => {
      clearTimeout(sendFormTimeout);
    };
  }, [status]);

  const handleStages = (stage: string | number) => {
    setStages((stages) => {
      let newStages: Stages = {
        first: "active",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
      };
      let isFoundActive = false;
      Object.keys(stages).forEach((elem, key) => {
        if (elem === stage || key + 1 === stage) {
          // @ts-ignore
          newStages[elem] = "active";
          isFoundActive = true;
        }
        // @ts-ignore
        else newStages[elem] = isFoundActive ? "" : "finish";
      });

      return newStages;
    });
  };

  const getCurrentStage = () => Object.keys(stages)[stageNumber - 1];
  const backStage = () => handleStages(stageNumber - 1);
  const nextStage = () => handleStages(stageNumber + 1);
  const skipStage = () => {
    const currInp = inputs[stageNumber - 2];
    //@ts-ignore
    if (stageNumber === 2) {
      //@ts-ignore
      currInp?.onChangeOther("username");
    } else if (stageNumber === 4) {
      setImages([]);
    } else {
      //@ts-ignore
      currInp?.onChangeOther("");
    }
    handleStages(stageNumber + 1);
  };

  const clearForm = () => {
    setStars(0);
    name.onChangeOther("");
    name.handleIsDirty(false);
    description.onChangeOther("");
    description.handleIsDirty(false);
    setImages([]);
    feedBack.onChangeOther("");
    feedBack.handleIsDirty(false);
  };

  const sendForm = () => {
    const photos = new FormData();
    imageFiles?.forEach((image, i) => photos.append(`image${i}`, image));
    console.log(photos, imageFiles);

    dispatch(
      sendReview({
        name: name.value,
        stars: stars,
        text: description.value,
        photos: imageFiles,
        tour: feedBack.value,
      })
    );
    clearForm();
    handleStages(1);
  };

  const handleEnter = (event: KeyboardEvent) => {
    const currInp = inputs[stageNumber - 2];
    if (stageNumber === 5 && event.key === "Enter") sendForm();
    else if (
      stageNumber >= 2 &&
      // @ts-ignore
      (currInp?.inputValid || currInp?.length) &&
      event.key === "Enter" &&
      !event.ctrlKey
    ) {
      nextStage();
    }

    if (event.ctrlKey && event.key === "Enter")
      // @ts-ignore
      inputs[stageNumber - 2]?.onChangeOther(
        // @ts-ignore
        inputs[stageNumber - 2]?.value + "\n"
      );
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleEnter);
    return () => {
      document.body.removeEventListener("keydown", handleEnter);
    };
  }, [stageNumber, inputs[stageNumber - 2]]);

  const handleStars = (starsCount: number) => {
    setStars(starsCount);
  };
  const handleImages = (newImages: string[]) => {
    setImages(newImages);
  };
  const handleImageFiles = (newImages: File[]) => {
    setImageFiles(newImages);
  };

  const activeStageStyle = "border-[3px] border-[#0092CB] bg-[#D2DEE3]";
  const finishStageStyle = "bg-[#0092CB]";

  if (status === "success")
    return (
      <div className="mx-auto max-w-[900px] min-h-[390px] flex justify-center items-center">
        <p className="text-center text-blueLight text-[24px] leading-[28px]">
          Thank you for your feedback! Your review has been successfully
          submitted and will be published as soon as it passes moderation.
        </p>
      </div>
    );

  if (status === "loading")
    return (
      <div className="mx-auto max-w-[900px] min-h-[390px] flex justify-center items-center">
        <img src={loading} alt="loading" />
      </div>
    );

  if (status === "error")
    return (
      <div className="mx-auto max-w-[900px] min-h-[390px] flex justify-center items-center">
        <p className="text-center text-red text-[24px] leading-[28px]">
          Something went wrong
        </p>
      </div>
    );

  return (
    <div className="mx-auto max-w-[900px]">
      <form
        className="min-h-[390px] flex justify-center items-center"
        action="/"
        method="post"
        onSubmit={(e) => e.preventDefault()}
      >
        <StageForm
          stage={getCurrentStage() || ""}
          setStages={handleStages}
          stars={stars}
          setStars={handleStars}
          name={name}
          description={description}
          images={images}
          setImages={handleImages}
          //@ts-ignore
          imageFiles={imageFiles}
          setImageFiles={handleImageFiles}
          feedBack={feedBack}
        />
      </form>
      <div
        style={{
          opacity: stageNumber >= 2 ? 1 : 0,
          pointerEvents: stageNumber >= 2 ? "all" : "none",
        }}
        className="my-20 mx-auto max-w-[625px] flex justify-between items-center animate-def"
      >
        <button className="btn gray" onClick={backStage}>
          Back
        </button>
        {stageNumber === 5 ? (
          <button onClick={sendForm} className="btn">
            Send
          </button>
        ) : // @ts-ignore
        inputs[stageNumber - 2]?.inputValid ||
          // @ts-ignore
          inputs[stageNumber - 2]?.length ? (
          <button onClick={nextStage} className="btn">
            Next
          </button>
        ) : (
          <button onClick={skipStage} className="btn gray">
            Skip
          </button>
        )}
      </div>
      <div className="flex justify-center items-center">
        {Object.keys(stages).map((stage, key) => (
          <React.Fragment key={key}>
            <div
              className={`w-[40px] h-[40px] rounded-[50%] animate-def ${
                // @ts-ignore
                stages[stage] === "active"
                  ? activeStageStyle
                  : // @ts-ignore
                  stages[stage] === "finish"
                  ? finishStageStyle
                  : "bg-[#D2DEE3]"
              }`}
            ></div>
            {key + 1 < Object.keys(stages).length && (
              <div
                className={`w-[27px] h-[7px] animate-def ${
                  // @ts-ignore
                  stages[stage] === "finish" ? finishStageStyle : "bg-[#D2DEE3]"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Form;
