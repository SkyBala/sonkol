import React, { useCallback } from "react";
import star from "../../assets/images/common/star.svg";
import starActive from "../../assets/images/common/star-active.svg";
import {
  // @ts-ignore
  Transition,
  // @ts-ignore
  SwitchTransition,
  // @ts-ignore
  TransitionGroup,
} from "react-transition-group";
import { IInput } from "../../hooks/useInput";
import Select from "../ui/Select";
import UploadImages from "./UploadImages";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface StageFormProps {
  stage: string;
  setStages: (stage: string) => void;
  stars: number;
  setStars: (stars: number) => void;
  name: IInput;
  description: IInput;
  images: string[];
  setImages: (newImages: string[]) => void;
  imageFiles: File[];
  setImageFiles: (newImages: File[]) => void;
  feedBack: IInput;
}

const StageForm: React.FC<StageFormProps> = ({
  stage,
  setStages,
  stars,
  setStars,
  name,
  description,
  images,
  setImages,
  imageFiles,
  setImageFiles,
  feedBack,
}) => {
  const tours = useSelector((state: RootState) => state.tours.data);
  const getOpacityAnimation = (state: string) =>
    state === "entering"
      ? "animate-[opacity-frame_0.2s_forwards]"
      : state === "exiting"
      ? "animate-[opacity-frame_0.2s_reverse_forwards]"
      : "";
  let finishFirstStageTimeout: number;
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    typeof fileReader.result === "string" &&
      setImages([...images, fileReader.result]);
  };

  const handleStars = useCallback((stars: number) => {
    clearTimeout(finishFirstStageTimeout);
    finishFirstStageTimeout = setTimeout(() => {
      setStages("second");
    }, 500);

    setStars(stars);
  }, []);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      fileReader.readAsDataURL(file);
      setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
    }
  };

  const starsElem = [...new Array(5)].map((_, key) => (
    <button
      key={key}
      className="outline-none"
      onClick={() => handleStars(key + 1 <= stars ? key + 1 - 1 : key + 1)}
    >
      <img
        className="w-[40px] h-[40px]"
        src={key + 1 <= stars ? starActive : star}
        alt="star"
      />
    </button>
  ));

  const onSelectTour = (value: string) => {
    const selectedTour = tours.find((tour) => tour.name === value)?.id;
    selectedTour && feedBack.onChangeOther(selectedTour + "");
  };

  return (
    <>
      <SwitchTransition mode={"out-in"}>
        <Transition key={stage} timeout={500}>
          {(state: string) =>
            stage === "first" ? (
              <div className={`${getOpacityAnimation(state)} w-full`}>
                <h2 className="text-[24px] text-center leading-[26px] font-normal">
                  Rate our service from 1 to 5 stars
                </h2>
                <div className="mt-20 flex justify-center gap-[20px]">
                  {starsElem}
                </div>
              </div>
            ) : stage === "second" ? (
              <div className={`${getOpacityAnimation(state)} w-full`}>
                <h2 className="text-[24px] text-center leading-[26px] font-normal">
                  What is your name?
                </h2>
                <input
                  value={name.value}
                  onChange={name.onChange}
                  onBlur={name.onBlur}
                  className={`mt-20 mx-auto max-w-[295px] inp ${
                    name.errorMsg ? "error" : ""
                  }`}
                  type="text"
                />
              </div>
            ) : stage === "third" ? (
              <div className={`${getOpacityAnimation(state)} w-full`}>
                <h2 className="text-[24px] text-center leading-[26px] font-normal">
                  Share your impressions about us
                </h2>
                <div
                  className={`mt-20 inp h-[150px] flex flex-col ${
                    name.errorMsg ? "error" : ""
                  }`}
                >
                  <textarea
                    value={description.value}
                    onChange={description.onChange}
                    onBlur={description.onBlur}
                    onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                    className="w-full flex-auto bg-[transparent] border-none outline-none"
                    placeholder="Enter here"
                  ></textarea>
                  <span className="mt-[5px] block text-end text-14 text-gray leading-[16px]">
                    {description.value.length}/1000
                  </span>
                </div>
              </div>
            ) : stage === "fourth" ? (
              <UploadImages
                state={state}
                images={images}
                handleImages={handleImages}
                setImages={setImages}
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
              />
            ) : stage === "fifth" ? (
              <div className={`${getOpacityAnimation(state)} w-full`}>
                <h2 className="text-[24px] text-center leading-[26px] font-normal">
                  Choose the tour your feedback is about (optional)
                </h2>
                <Select
                  placeholder="Select Item"
                  options={tours.map((tour) => tour.name)}
                  value={tours.find((tour) => tour.id === +feedBack.value)?.name || ""}
                  select={onSelectTour}
                  className="mt-20"
                />
              </div>
            ) : (
              ""
            )
          }
        </Transition>
      </SwitchTransition>
    </>
  );
};

export default StageForm;
