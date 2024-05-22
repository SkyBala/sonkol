import React, { useState } from "react";
import arrow from "../../assets/images/ui/select-arrow.svg";

interface SelectProps {
  placeholder?: string;
  options: string[];
  value: string;
  select: (value: string) => void;
  onBlur?: () => void;
  isError?: boolean;
  className?: string;
  rootStyles?: string;
  optionsStyles?: string;
  activeOptionStyles?: string;
  isAbsolute?: boolean;
}

const Select: React.FC<SelectProps> = ({
  placeholder,
  options,
  value,
  select,
  onBlur,
  isError,
  rootStyles = "",
  className = "",
  optionsStyles = "",
  activeOptionStyles = "",
  isAbsolute,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((bool) => {
      bool && onBlur?.();
      return !bool;
    });
  };

  const selectFunc = (value: string) => {
    select(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${rootStyles}`}>
      <button
        onClick={handleIsOpen}
        className={`inp outline-none flex justify-between text-start ${
          isError ? "error" : ""
        } ${className}`}
      >
        <span className={`${!value ? "text-grayBlue" : ""}`}>
          {value || placeholder}
        </span>
        <img
          className={`animate-def rotate-${isOpen ? "90" : "0"}`}
          src={arrow}
          alt="arrow"
        />
      </button>
      <div
        className={`pr-[3px] animate-def bg-gray rounded-[4px] shadow-[0px_8px_24px_rgba(22,_67,_92,_0.2)] overflow-hidden ${optionsStyles} ${
          isAbsolute ? "absolute w-full z-[200]" : ""
        }`}
        style={{
          maxHeight: isOpen ? 150 : 0,
          margin: isOpen ? "8px 0" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <ul className="max-h-[150px] overflow-scroll scroll-w-[5px] select-options">
          {options.map((option, key) => (
            <li key={key}>
              <button
                onClick={() => selectFunc(option)}
                className={`py-[14px] px-[16px] w-full hover:bg-darkGray text-start ${
                  option === value ? activeOptionStyles : ""
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
