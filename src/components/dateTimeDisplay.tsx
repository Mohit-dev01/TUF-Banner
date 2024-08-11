"use client";
import React from "react";

interface IDateTimeDisplayProps {
  value: number;
  type: string;
  isDanger: boolean;
}

const DateTimeDisplay = ({ value, type, isDanger }: IDateTimeDisplayProps) => {
  return (
    <div
      className={
        isDanger
          ? "flex flex-col items-center px-[12px] py-0 leading-[20px] text-[#ff0000]"
          : "flex flex-col items-center px-[12px] py-0 leading-[20px]"
      }
    >
      <p className="m-0">{value}</p>
      <span className="text-[12px] leading-[16px]">{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
