import React from "react";

const SkeletonLoader = () => {
  const skeletonArray = Array.from({ length: 3 });
  
  return skeletonArray.map((_, index) => (
    <div key={index} className="relative duration-300 tweetPost">
      <div className="flex flex-col px-5 py-3 space-x-3 border-b border-[#eff3f4]">
        <div className="flex space-x-3">
          <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse "></div>

          <div className="w-full">
            <div className="flex justify-between mb-2">
              <div className="flex items-center space-x-1">
                <p className="h-5 mr-1 bg-slate-200 w-28 animate-pulse "></p>
                <p className="h-3 bg-slate-200 w-28 animate-pulse "></p>
              </div>
            </div>
            <p className="h-2 bg-slate-200 w-28 animate-pulse "></p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default SkeletonLoader;