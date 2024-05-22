import React, { useState } from "react";

interface IconProps {
  src: string;
  hoverSrc: string;
  alt: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ src, hoverSrc, alt, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <img
      className={className}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      src={isHovered ? hoverSrc : src}
      alt={alt}
    />
  );
};

export default Icon;
