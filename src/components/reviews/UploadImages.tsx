import React from "react";
import {
  // @ts-ignore
  Transition,
  // @ts-ignore
  SwitchTransition,
  // @ts-ignore
  TransitionGroup,
} from "react-transition-group";
import upload from "../../assets/images/reviews/upload.svg";
import basket from "../../assets/images/reviews/basket.svg";
import plus from "../../assets/images/reviews/plus.svg";

interface UploadImagesProps {
  state: string;
  images: string[];
  imageFiles: File[];
  handleImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImages: (newImages: string[]) => void;
  setImageFiles: (newImages: File[]) => void
}

const UploadImages: React.FC<UploadImagesProps> = ({
  state,
  images,
  handleImages,
  imageFiles,
  setImages,
  setImageFiles,
}) => {
  const getOpacityAnimation = (state: string) =>
    state === "entering"
      ? "animate-[opacity-frame_0.2s_forwards]"
      : state === "exiting"
      ? "animate-[opacity-frame_0.2s_reverse_forwards]"
      : "";

  return (
    <div className={`${getOpacityAnimation(state)} w-full`}>
      <h2 className="text-[24px] text-center leading-[26px] font-normal">
        Share photos from tours (up to 4)
      </h2>
      <div className="mt-20">
        <div className="flex items-center gap-[30px] overflow-x-scroll scroll-none">
          {!!images.length && (
            <TransitionGroup
              component="ul"
              className="flex items-center gap-[30px]"
            >
              {images.map((image, key) => (
                <Transition key={key} timeout={500} mountOnEnter unmountOnExit>
                  {(state: string) => (
                    <li
                      style={{ backgroundImage: `url(${image})` }}
                      className={`rounded-[8px] w-[200px] h-[200px] flex justify-end items-start bg-center bg-cover bg-no-repeat outline-none ${getOpacityAnimation(
                        state
                      )}`}
                    >
                      <button
                        onClick={() => {
                          setImages(images.filter((_, i) => i !== key))
                          setImageFiles(imageFiles.filter((_, i) => i !== key))
                        }
                          
                        }
                        className="p-[12px] btn gray"
                      >
                        <img src={basket} alt="basket" />
                      </button>
                    </li>
                  )}
                </Transition>
              ))}
            </TransitionGroup>
          )}
          {!!images.length && images.length < 4 && (
            <label
              className="rounded-[8px] flex-[0_0_72px] h-[72px] bg-[#B3DEEF] flex justify-center items-center cursor-pointer animate-def"
              htmlFor="review-images"
            >
              <img src={plus} alt="plus" />
            </label>
          )}
        </div>
        {!images.length && (
          <label
            htmlFor="review-images"
            className={`rounded-[8px] w-full h-[200px] flex flex-col justify-center items-center bg-[#B3DEEF] cursor-pointer ${getOpacityAnimation(
              state
            )}`}
          >
            <img src={upload} alt="upload" />
            <span className="block mt-[17px] mb-[4px]">Upload file</span>
            <span className="text-grey text-[14px] leading-[16px]">
              Jpeg, png
            </span>
          </label>
        )}
      </div>
      <input
        onChange={handleImages}
        id="review-images"
        type="file"
        accept=".jpg, .jpeg, .png"
        className="hidden"
      />
    </div>
  );
};

export default UploadImages;
