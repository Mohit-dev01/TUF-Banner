"use client";
import React from "react";
import DateTimeDisplay from "./date-time-display";
import { useCountdown } from "~/hooks/useCountdown";
import ExpiredNotice from "./expired-notice";
import ShowCounter from "./show-counter";
import { Button } from "./ui/button";
import Link from "next/link";

// // Props for ExpiredNotice - no props needed
// const ExpiredNotice = () => {
//   return (
//     <div className="expired-notice">
//       <span>Expired!!!</span>
//       <p>Please select a future date and time.</p>
//     </div>
//   );
// };

// interface IShowCounterProps {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// const ShowCounter = ({ days, hours, minutes, seconds }: IShowCounterProps) => {
//   return (
//     <div className="p-[8px]">
//       <a
//         href="https://tapasadhikary.com"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center justify-center border border-r-[4px] border-[#ebebeb] p-[8px] text-[20px] font-bold leading-[28px] text-[#000]"
//       >
//         <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
//         <p>:</p>
//         <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
//         <p>:</p>
//         <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
//         <p>:</p>
//         <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
//       </a>
//     </div>
//   );
// };

interface ICountdownTimerProps {
  targetDate: Date;
  link: string;
  description: string;
}

const CountdownTimer = ({
  targetDate,
  link,
  description,
}: ICountdownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return (
      <>
        <div className="mt-[100px] flex items-center justify-center py-4">
          <Link
            href="/dashboard"
            className="word-wrap text-wrap bg-blue-950 px-4 py-2 text-center text-[20px] font-bold text-orange-300 hover:text-orange-400"
          >
            Click here to go to the Dashboard and active the banner
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link href={link} className="">
          <div className="px-5">
            <div className="mx-auto max-w-[306px]">
              <div className="flex flex-col items-center justify-center gap-10">
                <Button className="text-bold mt-[50px] w-full rounded-lg bg-slate-100 py-2 text-center text-[20px] hover:text-white">
                  Banner
                </Button>
                <ShowCounter
                  link={link}
                  days={days}
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />

                <div className="w-full">
                  <div className="text-bold w-full overflow-auto rounded-lg bg-slate-100 py-2 text-center text-[20px] text-black">
                    {description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
    );
  }
};

export default CountdownTimer;
