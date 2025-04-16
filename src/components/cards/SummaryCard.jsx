import React from "react";

export default function SummaryCard({
  title, value, icon, className
}) {
  return (
    <div>
      <div className={`flex gap-4 px-2 py-6 border rounded-md bg-white lg:px-4 lg:border-0`}>
        <div className={`flex justify-center items-center w-16 border rounded-md ${className}`}>
          {icon}
        </div>
        <div className="flex flex-col gap-1 lg:gap-2.5">
          <span className="text-sm text-slate-400">{title}</span>
          <span className="text-2xl text-slate-800 font-semibold lg:text-3xl">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
