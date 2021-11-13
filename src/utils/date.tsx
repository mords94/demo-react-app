import { Spinner } from '../components/common';

const ONE_DAY = 60 * 60 * 24;
const ONE_HOUR = 60 * 60;
const ONE_MINUTE = 60;

const padDigits = (number: number) => String(number).padStart(2, `0`);

export const formatCountdown = (diffInSeconds: number) => {
  if (diffInSeconds <= 1) {
    return <Spinner />;
  }
  const days = Math.floor(diffInSeconds / ONE_DAY);
  const hours = Math.floor((diffInSeconds - days * ONE_DAY) / ONE_HOUR);
  const minutes = Math.floor(
    (diffInSeconds - days * ONE_DAY - hours * ONE_HOUR) / ONE_MINUTE
  );
  const seconds =
    diffInSeconds - days * ONE_DAY - hours * ONE_HOUR - minutes * ONE_MINUTE;

  return `${padDigits(hours)}:${padDigits(minutes)}:${padDigits(seconds)}`;
};
