import React from "react";

const ChartContainer = ({ title, children }) => {
  return (
    <div className="flex flex-col items-center justify-between p-4 border border-slate-100 dark:border-slate-900 bg-slate-300/80 dark:bg-slate-900/50 rounded-3xl min-w-[80%] min-h-[80%]">
      <h3 className="text-2xl font-semibold pb-2.5 text-neutral-950 dark:text-neutral-100">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default ChartContainer;
