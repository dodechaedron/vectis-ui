import React from "react";

import Spinner from "./Spinner";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="md" />
    </div>
  );
};

export default Loading;
