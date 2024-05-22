import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import useMatchMedia from "use-match-media";
import review from "../../assets/images/common/review.svg";
import star from "../../assets/images/common/star.svg";
import starActive from "../../assets/images/common/star-active.svg";
import Text from "../ui/Text";
import { API_URL } from "../../http";
import { months } from "../../uttilities";

const Reviews: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tour);
  const isLDT = useMatchMedia("(max-width: 1350px)");

  return (
    <section className="mb-80">
      <div className="flex justify-between items-end slt:items-center nmbl:flex-col nmbl:gap-[10px]">
        <div className="flex items-end gap-[10px] slt:flex-col slt:items-start tb:gap-[4px]">
          <h2 className="title-2 whitespace-nowrap tb:text-24 tb:leading-[28px]">
            Reviews about this tour
          </h2>
          <span className="text-grayLight pb-[8px]">
            {data.reviewsCount} reviews
          </span>
        </div>
        <Link to="/reviews" className="flex gap-[10px]">
          <span className="text-blueLight text-[18px] leading-[21px] whitespace-nowrap">
            Write a review
          </span>
          <img src={review} alt="review" />
        </Link>
      </div>
      <ul className="my-40 flex justify-between gap-[30px] nlt:flex-col nlt:gap-[20px]">
        {data.reviews ? (
          data.reviews.map((review, key) => (
            <li className="flex-[625px_0_1] ldt:flex-[460px_0_1]" key={key}>
              <h3 className="text-[18px] leading-[21px] font-medium ">
                {review.name}
              </h3>
              <div className="mt-[8px] mb-20 flex items-center gap-[10px]">
                {[...new Array(review.stars)].map((_, key) => (
                  <img
                    className="w-[24px] h-[24px]"
                    key={key}
                    src={starActive}
                    alt="star-active"
                  />
                ))}
                {[...new Array(5 - review.stars)].map((_, key) => (
                  <img
                    className="w-[24px] h-[24px]"
                    key={key}
                    src={star}
                    alt="star"
                  />
                ))}
                <span className="text-blueLight text-[24px] leading-[28px] font-medium">
                  {review.stars}
                </span>
              </div>
              <div className="min-h-[95px]">
                <Text rowLimit={4}>{review.text}</Text>
              </div>
              <ul className="mt-10 mb-20 flex justify-between gap-[10px]">
                {review.photos
                  .slice(0, isLDT ? 1 : 2)
                  .map((image, key) => (
                    <li
                      className="w-full h-[215px] ldt:h-[305px] nlt:max-w-[690px] nlt:h-[480px] tb:max-w-[440px] tb:h-[305px] nmbl:max-w-[300px] nmbl:h-[200px]"
                      key={key}
                    >
                      <img
                        className="rounded-[4px] w-full h-full"
                        src={`${API_URL}${image[0]}`}
                        alt="review"
                      />
                    </li>
                  ))}
              </ul>
              <span className="block text-end text-grayLight text-[14px] leading-[16px]">
                {months[review.date.month - 1]} {review.date.day}, {review.date.year}
              </span>
            </li>
          ))
        ) : (
          <span>There is nothing here yet.</span>
        )}
      </ul>
      <Link className="btn2 mx-auto" to="/reviews">
        See all reviews
      </Link>
    </section>
  );
};

export default Reviews;
