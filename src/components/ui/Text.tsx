import React, { useState, useEffect, useRef } from "react";

interface TextProps {
  children: React.ReactNode;
  rowLimit: number;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, rowLimit, className }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [rowsCount, setRowsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    textRef.current &&
      setRowsCount(Math.floor(textRef.current?.scrollHeight / 16));
  }, [textRef.current]);

  return (
    <>
      <p
        ref={textRef}
        style={{ WebkitLineClamp: rowLimit }}
        className={`${isOpen ? "" : "text"} ${className || ""}`}
      >
        {children}
      </p>
      {rowsCount > rowLimit && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="block text-blueLight"
        >
          ещё...
        </button>
      )}
    </>
  );
};

export default Text;
