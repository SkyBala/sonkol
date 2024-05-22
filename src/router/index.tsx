import FAQ from "../pages/FAQ";
import Tour from "../pages/Tour";
import Tours from "../pages/Tours";
import BlogNews from "../pages/BlogNews";
import Reviews from "../pages/Reviews";
import Transport from "../pages/Transport";
import Blog from "../pages/Blog";
import NotFoundPage from "../pages/NotFoundPage";
import News from "../pages/News";
import MainPage from "../pages/MainPage";

export const router = [
  { key: 1, path: "/", element: <MainPage /> },
  { key: 2, path: "/blogNews", element: <BlogNews /> },
  { key: 3, path: "/tours", element: <Tours /> },
  { key: 4, path: "/tour/:id", element: <Tour /> },
  { key: 5, path: "/transport", element: <Transport /> },
  { key: 6, path: "/reviews", element: <Reviews /> },
  { key: 7, path: "/FAQ", element: <FAQ /> },
  { key: 8, path: "/blog/:id", element: <Blog /> },
  { key: 9, path: "/news/:id", element: <News /> },
  { key: 10, path: "*", element: <NotFoundPage /> },
];
