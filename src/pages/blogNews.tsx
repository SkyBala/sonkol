import React, { useEffect, useState, useRef, useCallback } from "react";
import Search from "../components/blogNews/Search";
import { RootState, useAppDispatch } from "../store/store";
import { getBlogsNews, setOffset } from "../store/slices/blogNewsSlice";
import { useSelector } from "react-redux";
import useMatchMedia from "use-match-media";
import StatusCheck from "../components/ui/StatusCheck";
import BlogCard from "../components/blogNews/BlogCard";
import NewsCard from "../components/blogNews/NewsCard";
import Pagination from "../components/ui/Pagination";

const BlogNews: React.FC = () => {
  const dispatch = useAppDispatch();
  const [sticky, setSticky] = useState("");
  const aside = useRef<HTMLDivElement>(null);
  const { data, status, searchValue, offset, count, limit } = useSelector(
    (store: RootState) => store.blogNews
  );
  const isLt = useMatchMedia("(max-width: 1024px)");
  const getPagesCount = () => Math.ceil(count / limit);
  const [nav, setNav] = useState("blog");

  useEffect(() => {
    dispatch(getBlogsNews());
  }, [searchValue, offset]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      const stickyBlock = aside.current;

      //@ts-ignore
      const asideHeight = stickyBlock?.firstChild.offsetHeight;
      const neighborHeight =
        //@ts-ignore
        stickyBlock?.previousElementSibling?.firstChild.offsetHeight;

      if (
        stickyBlock &&
        !isLt &&
        asideHeight <= neighborHeight &&
        asideHeight >= window.innerHeight
      ) {
        const { top } = aside.current.getBoundingClientRect();

        if (window.innerHeight <= asideHeight + top + 20) {
          setSticky("top");
        } else if (
          stickyBlock.parentElement &&
          scrollPosition +
            (asideHeight > window.innerHeight
              ? window.innerHeight
              : asideHeight) >=
            stickyBlock.parentElement?.offsetHeight +
              stickyBlock.parentElement?.offsetTop
        ) {
          setSticky("bottom");
        } else {
          setSticky("sticky");
        }
      } else setSticky("top");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const stickyBlock = aside.current;
    //@ts-ignore
    const asideHeight = stickyBlock?.firstChild.offsetHeight;
    const neighborHeight =
      //@ts-ignore
      stickyBlock?.previousElementSibling?.firstChild.offsetHeight;
    if (
      isLt &&
      asideHeight >= neighborHeight &&
      asideHeight <= window.innerHeight
    )
      setSticky("");
  }, [
    //@ts-ignore
    aside.current?.firstChild.offsetHeight,
    //@ts-ignore
    aside.current?.previousElementSibling?.firstChild.offsetHeight,
    isLt,
    data,
  ]);

  const blogs = data.filter((blog) => blog.category === "Blog");
  const blogsArray = [...new Array(Math.ceil(blogs.length / 3))]
    .map((_, key) => blogs.slice(key * 3, (key + 1) * 3))
    .map((blogElem, key) => (
      <div key={key}>
        <BlogCard {...blogElem[0]} type="big" />
        {blogElem[1] && (
          <div className="mt-40 flex justify-between gap-[20px] slt:block slt:[&>:not(:last-child)]:mb-40">
            {blogElem.slice(1).map((blog) => (
              <BlogCard key={blog.image} {...blog} type="small" />
            ))}
          </div>
        )}
      </div>
    ));
  const news = data.filter((blog) => blog.category === "News");

  const onChangePage = useCallback((newPage: number) => {
    dispatch(setOffset((newPage - 1) * limit));
  }, []);

  return (
    <div className="container pt-[160px] pb-80">
      <Search />
      <nav className="hidden lt:block my-50 slt:mt-30">
        <ul className="flex justify-center gap-[50px]">
          <li>
            <button
              onClick={() => setNav("blog")}
              className="text-[34px] leading-[40px] text-smooth slt:text-[24px] slt:leading-[28px]"
            >
              Blog
            </button>
            {nav === "blog" && (
              <div className="rounded-[6px] h-[6px] bg-[#3C3C3C] "></div>
            )}
          </li>
          <li>
            <button
              onClick={() => setNav("news")}
              className="text-[34px] leading-[40px] text-smooth slt:text-[24px] slt:leading-[28px]"
            >
              News
            </button>
            {nav === "news" && (
              <div className="rounded-[6px] h-[6px] bg-[#3C3C3C] "></div>
            )}
          </li>
        </ul>
      </nav>
      <StatusCheck status={status}>
        <div className="mt-80 flex justify-between gap-[30px] lt:justify-center lt:text-center">
          {(isLt && nav !== "blog") || (
            <section className="flex-[0_1_840px]">
              <div>
                <h2 className="text-[48px] leading-[56px]">Blog</h2>
                <span className="block mt-[16px] mb-40 text-[18px] leading-[24px] text-blueDark">
                  Here you can get useful tips and information about Kyrgyzstan
                  and tourism in Kyrgyzstan.
                </span>
                <div className="flex-[0_1_840px] [&>:not(:last-child)]:mb-40">
                  {blogsArray.length ? (
                    blogsArray
                  ) : (
                    <span>There is nothing here yet.</span>
                  )}
                </div>
              </div>
            </section>
          )}
          {(isLt && nav !== "news") || (
            <aside
              ref={aside}
              className="relative flex-[0_1_405px] lt:flex-grow"
            >
              <div
                className={`max-w-[405px] lt:max-w-none ${
                  sticky === "sticky"
                    ? "fixed bottom-[20px]"
                    : sticky === "bottom"
                    ? "absolute bottom-[20px]"
                    : ""
                }`}
              >
                <h2 className="text-[48px] leading-[56px]">News</h2>
                <span className="block mt-[16px] mb-40 text-[18px] leading-[24px] text-blueDark">
                  Here you can check out our latest events.
                </span>
                <div className="[&>:not(:last-child)]:mb-[54px]">
                  {news.length ? (
                    news.map((news) => <NewsCard key={news.image} {...news} />)
                  ) : (
                    <span>There is nothing here yet.</span>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </StatusCheck>
      <Pagination
        page={Math.ceil((offset + 1) / limit)}
        limit={getPagesCount()}
        change={onChangePage}
        className="mt-80 justify-center"
      />
    </div>
  );
};

export default BlogNews;
