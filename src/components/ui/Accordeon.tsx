import React, { useState, useRef } from "react";
import arrow from "../../assets/images/common/arrow.svg";

interface AccordeonProps {
  children: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  bodyStyle?: string;
  marginTop?: number;
  isActive?: boolean;
  isArrow?: boolean;
  spaceBetween?: number;
  onOpen?: () => void;
  handleIsActive?: () => void;
}

const Accordeon: React.FC<AccordeonProps> = ({
  title,
  children,
  className,
  bodyStyle = "",
  marginTop,
  isActive,
  isArrow = true,
  spaceBetween = 30,
  handleIsActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const accordBody = useRef<HTMLDivElement>(null);

  const handleIsOpen = () => {
    handleIsActive ? handleIsActive() : setIsOpen((state) => !state);
  };

  return (
    <div className={className}>
      <button
        onClick={handleIsOpen}
        style={{
          color: isHover ? "#1A9DD0" : "",
        }}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="w-full flex justify-between items-center hover:text-blue [&_h2]:hover:text-blue accord-head !important"
      >
        {title}
        {isArrow && (
          <div className="flex-shrink-0">
            <img
              className={`animate-def ${
                isActive || isOpen ? "rotate-90" : "rotate-0"
              }`}
              src={arrow}
              alt="arrow"
            />
          </div>
        )}
      </button>
      <div
        ref={accordBody}
        className={`overflow-hidden animate-def ${bodyStyle}`}
        style={{
          maxHeight: isOpen || isActive ? accordBody.current?.scrollHeight : 0,
          marginTop: isOpen || isActive ? marginTop || spaceBetween : 0,
          opacity: isOpen || isActive ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordeon;
