import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Accordeon from "../ui/Accordeon";
import cross from "../../assets/images/tour/photo-cross.svg";
import leftArrow from "../../assets/images/tour/photo-arrow-left.svg";
import rightArrow from "../../assets/images/tour/photo-arrow-right.svg";

const Photo: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tour);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [photo, setPhoto] = useState(0);

  const openPhoto = (newPhoto: number) => {
    setPhoto(newPhoto);
    setIsPhotoOpen(true);
  };

  return (
    <>
      <Accordeon
        title={<h2 className="pl-10 title-2 smbl:pl-0">Photo</h2>}
        className="pt-30"
      >
        {data.photos?.images.length ? (
          <ul className="pb-20 grid grid-cols-2 gap-[10px] bottom-line tb:grid-cols-1">
            {data.photos?.images.map((photo, key) => (
              <li className="max-h-[295px]" key={key}>
                <button
                  onClick={() => openPhoto(key)}
                  className="w-full h-full"
                >
                  <img
                    className="w-full h-full object-cover tb:mx-auto"
                    src={`http://${photo}`}
                    alt="minor"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <span>Empty</span>
        )}
      </Accordeon>
      {isPhotoOpen && (
        <div
          onClick={() => setIsPhotoOpen(false)}
          className="px-[50px] w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.2)] slt:hidden"
        >
          <div
            className="relative flex justify-center gap-[70px] ldt:gap-[25px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0"
              onClick={() => setIsPhotoOpen(false)}
            >
              <img src={cross} alt="cross" />
            </button>
            {photo >= 1 ? (
              <button
                className="w-[40px] flex-shrink-0 slt:hidden"
                onClick={() => setPhoto((id) => id - 1)}
              >
                <img src={leftArrow} alt="left-arrow" />
              </button>
            ) : (
              <div className="w-[40px] slt:hidden"></div>
            )}
            <div className="w-[1060px] ldt:w-full ldt:max-w-[820px] slt:w-[587px]">
              <img
                className="rounded-[12px] w-full object-contain"
                src={`http://${data.photos?.images[photo]}`}
                alt="minor-2"
              />
            </div>
            {photo + 1 < data.photos?.images.length ? (
              <button
                className="w-[40px] flex-shrink-0 slt:hidden"
                onClick={() => setPhoto((id) => id + 1)}
              >
                <img src={rightArrow} alt="right-arrow" />
              </button>
            ) : (
              <div className="w-[40px] slt:hidden"></div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Photo;
