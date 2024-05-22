import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import scrollArrow from "../assets/images/common/scroll-arrow.svg";

const HomePage: React.FC = () => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsScrollVisible(true);
    } else {
      setIsScrollVisible(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <button
        disabled={!isScrollVisible}
        onClick={scrollToTop}
        className="fixed bottom-[50px] right-[50px] flex justify-center items-center w-[64px] h-[64px] rounded-[50%] bg-[#799BAA] z-[150] animate-def disabled:rotate-180 disabled:opacity-0 disabled:pointer-events-none slt:bottom-[20px] slt:right-[20px]"
      >
        <img src={scrollArrow} alt="scroll-arrow" />
      </button>
    </div>
  );
};

export default HomePage;
