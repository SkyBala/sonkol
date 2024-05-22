import React, { useEffect, useState } from "react";
// @ts-ignore
import { Transition } from "react-transition-group";
import Burger from "./Burger";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useIsLoading } from "../hooks/useIsLoading";
import logo from "../assets/images/common/logo.svg";
import logoWhite from "../assets/images/common/logo-white.svg";
import whatsapp from "../assets/images/common/whatsapp.svg";
import hoverWhatsapp from "../assets/images/common/whatsapp-hover.svg";
import tripAdvisor from "../assets/images/common/trip-advisor.svg";
import tripAdvisorHover from "../assets/images/common/trip-advisor-hover.svg";
import facebook from "../assets/images/common/facebook.svg";
import facebookHover from "../assets/images/common/facebook-hover.svg";
import instagram from "../assets/images/common/instagram.svg";
import instagramHover from "../assets/images/common/instagram-hover.svg";
import burgerIcon from "../assets/images/header/burger.svg";
import burgerIconWhite from "../assets/images/header/burger-white.svg";
import Icon from "./ui/Icon";

const Header: React.FC = () => {
  const location = useLocation();
  const [isBurgerActive, setBurgerActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const isLoadingOrError = useIsLoading();

  useEffect(() => {
    const handleScroll = () => {
      // Получаем текущую позицию прокрутки страницы
      const scrollPosition = document.documentElement.scrollTop;

      if (scrollPosition >= 110) setIsHidden(true);
      else setIsHidden(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isBurgerActive ? "hidden" : "";
  }, [isBurgerActive]);

  const handleIsBurgerActive = () => {
    setBurgerActive((bool) => !bool);
  };

  const isWhiteMode = () =>
    !isLoadingOrError &&
    (location.pathname.split("/").includes("tour") ||
      location.pathname === "/");

  return (
    <>
      <header
        className={`fixed top-[0%] left-0 w-full py-40 z-[300] animate-def ${
          isWhiteMode() ? "" : "bg-[#F2FAFC]"
        } ${isHidden ? "translate-y-[-100%]" : ""}`}
      >
        <div className="container flex justify-between items-center">
          <Link className="slt:w-[150px] mbl:w-[100px]" to="/">
            <img
              className="w-full"
              src={isWhiteMode() ? logoWhite : logo}
              alt="logo"
            />
          </Link>
          <ul
            className={`flex items-center gap-[40px] lt:hidden ${
              isWhiteMode() ? "text-white" : ""
            }`}
          >
            <li>
              <NavLink to="/tours">Tours</NavLink>
            </li>
            <li>
              <NavLink to="/transport">Transport</NavLink>
            </li>
            <li>
              <NavLink to="/reviews">Reviews</NavLink>
            </li>
            <li>
              <NavLink to="/blogNews">Blog & News</NavLink>
            </li>
            <li>
              <NavLink to="/?questions">Questions</NavLink>
            </li>
          </ul>
          <ul className="flex items-center gap-[20px] slt:gap-[10px]">
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=996706990087"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  className="w-[40px] h-[40px]"
                  src={whatsapp}
                  hoverSrc={hoverWhatsapp}
                  alt="whatsapp"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.tripadvisor.ru/Attraction_Review-g293948-d12370417-Reviews-Song_Kol_Travel-Bishkek.html"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  className="w-[40px] h-[40px]"
                  src={tripAdvisor}
                  hoverSrc={tripAdvisorHover}
                  alt="tripAdvisor"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/songkollake/"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  className="w-[40px] h-[40px]"
                  src={facebook}
                  hoverSrc={facebookHover}
                  alt="facebook"
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/songkol_travel/"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  className="w-[40px] h-[40px]"
                  src={instagram}
                  hoverSrc={instagramHover}
                  alt="instagram"
                />
              </a>
            </li>
          </ul>
          <button
            onClick={handleIsBurgerActive}
            className="hidden lt:block show"
          >
            <img
              src={isWhiteMode() ? burgerIconWhite : burgerIcon}
              alt="burger"
            />
          </button>
        </div>
      </header>
      <Transition in={isBurgerActive} timeout={500} mountOnEnter unmountOnExit>
        {(state: string) => (
          <Burger setIsActive={handleIsBurgerActive} animateKey={state} />
        )}
      </Transition>
    </>
  );
};

export default Header;
