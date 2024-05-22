import React from "react";
import background from "../../assets/images/main-page/about.jpg";

const About: React.FC = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="pt-[100px] min-h-[970px] bg-cover bg-no-repeat bg-center text-white text-center"
      >
        <div className="container">
          <h2 className="mb-10 title-2 text-white">About Song-Kol Travel</h2>
          <p className="mx-auto max-w-[1200px] text-18 leading-[26px]">
            Song-Kol Travel is a friendly team that specializes in conducting
            tours to the picturesque Lake Song-Kol with pride. We also offer
            unique and exciting tours throughout Kyrgyzstan.{" "}
            <span className="text-[#D79300]">
              As direct organizers, we can guarantee you the best prices and
              quality of service. But what truly makes us special is our
              experience and professionalism in conducting tours to Song-Kol
              Lake.
            </span>{" "}
            We know this place better than anyone and are ready to ensure you
            have a safe and exciting journey! By choosing us, you can be
            confident in the quality of our services and that your trip will
            become an unforgettable adventure.
          </p>
        </div>
      </div>
      <div className="pt-40 pb-80 bg-dark text-center text-white">
        <div className="container">
          <h2 className="mb-40 title-2 text-white">Why Us?</h2>
          <ol className="grid grid-cols-2 gap-x-[30px] gap-y-[36px] lt:grid-cols-1 lt:justify-center">
            <li className="flex items-start justify-between gap-[10px] lt:justify-center">
              <span className="text-[100px] leading-[100px] flex-[0_0_80px]">1</span>
              <div className="flex-[0_1_535px] text-start">
                <h3 className="mb-10 text-[24px] leading-[28px] font-normal">
                  Experienced guides and horsemen with years of experience.
                </h3>
                <span>
                  Our staff has rich experience in tourism and is always ready
                  to share their knowledge and expertise.
                </span>
              </div>
            </li>
            <li className="flex items-start justify-between gap-[10px] row-start-2 lt:justify-center">
              <span className="text-[100px] leading-[100px] flex-[0_0_80px]">2</span>
              <div className="flex-[0_1_535px] text-start">
                <h3 className="mb-10 text-[24px] leading-[28px] font-normal">
                  Special horse riding equipment.
                </h3>
                <span>
                  We use only quality equipment that ensures the comfort and
                  safety of our clients.
                </span>
              </div>
            </li>
            <li className="flex items-start justify-between gap-[10px] lt:justify-center">
              <span className="text-[100px] leading-[100px] flex-[0_0_80px]">3</span>
              <div className="flex-[0_1_535px] text-start">
                <h3 className="mb-10 text-[24px] leading-[28px] font-normal">
                  We are direct organizers.
                </h3>
                <span>
                  We work without intermediaries, which allows us to offer you
                  the best prices for high-quality tours.
                </span>
              </div>
            </li>
            <li className="flex items-start justify-between gap-[10px] lt:justify-center">
              <span className="text-[100px] leading-[100px] flex-[0_0_80px]">4</span>
              <div className="flex-[0_1_535px] text-start">
                <h3 className="mb-10 text-[24px] leading-[28px] font-normal">
                  Experts in horseback riding tours.
                </h3>
                <span>
                  Our team has high qualifications and experience in organizing
                  horse riding tours.
                </span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default About;
