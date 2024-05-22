import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../store/store";
import { getBlogNewsAbout } from "../store/slices/blogNewsAboutSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StatusCheck from "../components/ui/StatusCheck";
import BlogCard from "../components/blogNews/BlogCard";

const Blog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, status, errorMsg } = useSelector(
    (state: RootState) => state.blogNewsAbout
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
    id &&
      dispatch(
        getBlogNewsAbout({ id: +id, similarBlogsLimit: 3, category: "Blog" })
      );
  }, [id]);

  return (
    <StatusCheck status={status} errorMsg={errorMsg}>
      <div className="pt-[120px] pb-80 lt:pb-40">
        <div
          style={{ backgroundImage: `url(${data.image})` }}
          className="relative pb-40 min-h-[515px] flex flex-col justify-end bg-cover bg-center bg-no-repeat text-white text-start before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(180deg,_rgba(217,217,217,0.00)_0%,_rgba(0,0,0,0.60)_100%)]"
        >
          <div className="container z-10">
            <h1 className="text-[48px] leading-[56px] font-medium text-white text-start">
              {data.title}
            </h1>
            <h2 className="my-10 text-[24px] leading-[28px] font-medium">
              Blog
            </h2>
            <span>{data.date_posted.split("-").join(".")}</span>
          </div>
        </div>
        <div className="pt-80 container lt:pt-40">
          <div
            dangerouslySetInnerHTML={{
              __html: data.content || <span>There is nothing here yet.</span>,
            }}
          ></div>
          <div className="mt-80">
            <h2 className="title-2 text-black">Similar blogs</h2>
            <div className="mt-40 flex gap-[30px]">
              {data.similar?.length ? (
                data?.similar?.map((blog) => (
                  <BlogCard {...blog} type="normal" />
                ))
              ) : (
                <span>There is nothing here yet.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </StatusCheck>
  );
};

export default Blog;
