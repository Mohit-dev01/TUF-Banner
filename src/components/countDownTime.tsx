'use client'
import React from "react";
import { useCountdown } from "~/hooks/useCountdown";
import ExpiredNotice from "./expiredNotice";
import ShowCounter from "./showCounter";

interface ICountdownTimerProps {
  targetDate: Date;
  link : string
}

const CountdownTimer = ({ targetDate, link }: ICountdownTimerProps) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice/>;
  } else {
    return (
      <ShowCounter
      link=""
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
