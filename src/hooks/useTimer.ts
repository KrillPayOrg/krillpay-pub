import React, {useEffect, useState} from 'react';

let timer: any;

const useTimer = (num: number) => {
  const [timeLeft, setTimeLeft] = useState(num);

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  const start = () => {
    setTimeLeft(num || 30);
    clearTimeout(timer);
    startTimer();
  };

  useEffect(() => {
    if (timeLeft >= 0) {
      startTimer();
    }
    return () => clearTimeout(timer);
  });

  return {timeLeft, start};
};

export default useTimer;
