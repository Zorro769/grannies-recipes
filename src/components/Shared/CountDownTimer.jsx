import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (time / initialTime) * circumference;

  return (
    <div className="countdown-timer">
      <svg className="countdown-svg" width="50" height="50">
        <circle
          className="countdown-circle"
          stroke="green"
          strokeWidth="5"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className="countdown-text">
        {time > 0 ? time : window.location.replace("/")}
      </div>
    </div>
  );
};

export default CountdownTimer;
