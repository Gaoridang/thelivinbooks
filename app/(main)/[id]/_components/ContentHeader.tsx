import React from "react";

const ContentHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500/50"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
        <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
      </div>
      <p className="text-sm font-semibold text-gray-400/70">04. 06</p>
    </div>
  );
};

export default ContentHeader;
