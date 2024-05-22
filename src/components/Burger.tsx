import React from "react";
import arrow from "../assets/images/header/arrow.svg";
import { Link } from "react-router-dom";

interface BurgerProps {
  setIsActive: () => void;
  animateKey: string;
}

const Burger: React.FC<BurgerProps> = ({ setIsActive, animateKey }) => {
  const closeBurger = () => {
    animateKey === "entered" && setIsActive();
  };

  return (
    <div
      onClick={closeBurger}
      className="absolute top-0 right-0 hidden justify-end w-full text-white lt:flex z-[300]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          max-w-[510px] w-full h-screen flex
         bg-dark overflow-scroll show-burger ${animateKey} slt:max-w-[385px]
        `}
      >
        <button
          onClick={closeBurger}
          className="px-[12px] flex justify-center items-center"
        >
          <img src={arrow} alt="arrow" />
        </button>
        <ul
          className="
            flex flex-[1_1_100%] flex-col justify-center items-center 
            gap-[60px] text-36 slt:text-24 leading-[28px]
          "
        >
          <li>
            <Link to="/tours" onClick={closeBurger}>Tours</Link>
          </li>
          <li>
            <Link to="/transport" onClick={closeBurger}>Transport</Link>
          </li>
          <li>
            <Link to="/reviews" onClick={closeBurger}>Reviews</Link>
          </li>
          <li>
            <Link to="/blogNews" onClick={closeBurger}>Blog & News</Link>
          </li>
          <li>
            <Link to="/?questions" onClick={closeBurger}>Questions</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Burger;
