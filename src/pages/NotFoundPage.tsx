import React, { useEffect } from "react";

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="title-3">This page does not exist</h1>
    </div>
  );
};

export default NotFoundPage;
