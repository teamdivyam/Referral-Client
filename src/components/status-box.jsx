import { CheckCheck, CircleCheckBig, CircleX, Hourglass } from "lucide-react";
import React from "react";

export default function StatusBox({ status }) {
  const renderIconBasedOnStatus = () => {
    switch (status) {
      case "pending":
        return <Hourglass size={18} />;
      case "approved":
        return <CircleCheckBig size={18} />
      case "rejected":
        return <CircleX size={18} />;
    }
  };

  return (
    <div
      className={`flex gap-1 items-center justify-center py-1.5 rounded-full size-9 text-xs lg:text-sm lg:size-0 lg:h-auto lg:w-24 lg:rounded-md ${
        status === "pending"
          ? "bg-orange-100 text-orange-800"
          : status === "approved"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {renderIconBasedOnStatus()}
      <span className="hidden lg:block">{status}</span>
    </div>
  );
}
