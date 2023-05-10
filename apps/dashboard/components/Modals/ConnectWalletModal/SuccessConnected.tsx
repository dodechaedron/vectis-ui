import React from 'react';

const SuccessConnect: React.FC = () => {
  return (
    <>
      <p className="text-center font-bold">Account Connected!</p>
      <div className="group flex items-center justify-between gap-4 rounded-lg bg-gray-200 p-2 ">
        <div className="flex items-center justify-between gap-2">
          <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-white p-2"></div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Test name</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessConnect;
