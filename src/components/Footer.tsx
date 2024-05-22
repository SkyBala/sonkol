import React from "react";
import logo from "../assets/images/common/logo-two.svg";
import whatsapp from "../assets/images/common/whatsapp.svg";
import whatsappHover from "../assets/images/common/whatsapp-hover.svg";
import tripAdvisor from "../assets/images/common/trip-advisor.svg";
import tripAdvisorHover from "../assets/images/common/trip-advisor-hover.svg";
import facebook from "../assets/images/common/facebook.svg";
import facebookHover from "../assets/images/common/facebook-hover.svg";
import instagram from "../assets/images/common/instagram.svg";
import instagramHover from "../assets/images/common/instagram-hover.svg";
import Icon from "./ui/Icon";

const Footer: React.FC = () => {
  return (
    <footer className="bg-def py-40 text-white">
      <div className="container flex gap-[100px] slt:flex-col slt:gap-[40px]">
        <div>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <span className="block my-45 text-24 slt:my-20 leading-[28px]">
            Tours to Song-Kol lake and throughout Kyrgyzstan
          </span>
          <ul className="flex items-center gap-[30px]">
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=996706990087"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  className="w-[40px] h-[40px]"
                  src={whatsapp}
                  hoverSrc={whatsappHover}
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
            <li className=":[&:nth-child(3)]:hover:underline">
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
        </div>
        <div>
          <ul className="[&>:not(:last-child)]:mb-20">
            <li className="">
              <h3 className="text-24 mb-[4px] whitespace-nowrap">
                Phone number, What's App
              </h3>
              <a
                className="text-18"
                href="https://api.whatsapp.com/send?phone=996706990087"
                target="_blank"
                rel="noreferrer"
              >
                +996(706) 99-00-87
              </a>
            </li>
            <li>
              <h3 className="text-24 mb-[4px] whitespace-nowrap">E-mail</h3>
              <a className="text-18" href="mailto:kenzebekovaermek@gmail.com">
                kenzebekovaermek@gmail.com
              </a>
            </li>
            <li>
              <h3 className="text-24 mb-[4px] whitespace-nowrap">Instagram</h3>
              <a
                className="text-18"
                href="https://www.instagram.com/songkol_travel/"
                target="_blank"
                rel="noreferrer"
              >
                songkol_travel
              </a>
            </li>
            <li>
              <h3 className="text-24 mb-[4px] whitespace-nowrap">Facebook</h3>
              <a
                className="text-18"
                href="https://www.facebook.com/songkollake/"
                target="_blank"
                rel="noreferrer"
              >
                Song-Kol Travel
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
