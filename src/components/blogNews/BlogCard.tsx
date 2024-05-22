import React from "react";
import { IBlogNews } from "../../@types";
import { Link } from "react-router-dom";

interface BlogCardProps extends IBlogNews {
  type?: "big" | "small" | "normal";
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  type = "normal",
  image,
  title,
  date_posted,
}) => {
  return (
    <Link
      to={`/blog/${id}`}
      style={{ backgroundImage: `url(${image})` }}
      className={`rounded-[8px] text-white flex flex-col justify-end bg-cover bg-no-repeat bg-center text-start relative before:bg-[linear-gradient(180deg,_rgba(217,217,217,0.00)_0%,_rgba(0,0,0,0.60)_100%)] before:absolute before:w-full before:h-full before:top-0 before:left-0 before:rounded-[8px] ${
        type === "big"
          ? "max-w-[840px] min-h-[517px] p-40 dt:p-20 dt:min-h-[420px] slt:min-h-[270px]"
          : type === "small"
          ? "p-20 max-w-[405px] w-full min-w-[260px] min-h-[295px] dt:min-w-[260px] dt:min-h-[190px] dt:p-10 lt:min-h-[240px] lt:min-w-[0px] slt:max-w-none slt:min-h-[270px] slt:p-20"
          : "p-20 max-w-[405px] w-full min-h-[297px] slt:h-[270px] lt:p-10"
      }`}
    >
      <h3
        className={`font-normal mb-10 z-20 ${
          type === "big"
            ? "text-[36px] leading-[42px] dt:text-[24px] dt:leading-[28px]"
            : "text-[18px] leading-[24px] dt:text-[16px] dt:leading-[18px] slt:text-[24px] slt:leading-[28px]"
        }`}
      >
        {title}
      </h3>
      <span className="dt:text-[14px] dt:leading-[16px] z-20">
        {date_posted.split("-").join(".")}
      </span>
    </Link>
  );
};

export default BlogCard;
