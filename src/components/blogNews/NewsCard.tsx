import React from "react";
import { IBlogNews } from "../../@types";
import { Link } from "react-router-dom";

const NewsCard: React.FC<IBlogNews> = ({ id, title, date_posted, image }) => {
  return (
    <div className="max-w-[405px] w-full text-start dt:max-w-[380px] lt:max-w-[690px] lt:mx-auto">
      <h3 className="mb-[5px] text-[24px] leading-[28px] text-[#0B0B0B] lt:mb-[7px]">
        {title}
      </h3>
      <span className="text-[#232323]">{date_posted.split("-").join(".")}</span>
      <div className="mt-[9px] mb-[23px] max-h-[295px] overflow-hidden lt:mt-[20px] lt:max-h-[540px]">
        <img
          className="w-full rounded-[10px] object-center h-[280px] lt:h-[538px] slt:h-[270px]"
          src={image}
          alt="news"
        />
      </div>
      <Link
        className="block text-blue text-18 leading-[24px] text-end"
        to={`/news/${id}`}
      >
        More details...
      </Link>
    </div>
  );
};

export default NewsCard;
