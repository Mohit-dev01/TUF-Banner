"use client";
import React from "react";
import DateTimeDisplay from "./dateTimeDisplay";
import Link from "next/link";

interface IShowCounterProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  link: string;
}

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
  link,
}: IShowCounterProps) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-full">
        <Link
          href={`${link}`}
          target="_blank"
          // rel="noopener noreferrer"
          className="flex items-center bg-black justify-center rounded-lg  p-[30px] text-[20px] font-bold leading-[28px] text-[#ffffff]"
        >
          <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
        </Link>
      </div>
    </div>
  );
};

export default ShowCounter;
