import React from "react";
import warning from "../../assets/images/common/warning.svg";

interface WarningProps {
  children: React.ReactNode;
  className?: string;
  imgStyles?: string;
  textStyles?: string;
}

const Warning: React.FC<WarningProps> = ({
  children,
  className = "",
  imgStyles = "",
  textStyles = "",
}) => {
  return (
    <div className={`flex items-center gap-[15px] ${className}`}>
      <img className={imgStyles} src={warning} alt="warning" />
      <span
        className={`text-[18px] leading-[24px] text-yell mbl:text-[16px] mbl:leading-[19px] ${textStyles}`}
      >
        {children}
      </span>
    </div>
  );
};

export default Warning;
