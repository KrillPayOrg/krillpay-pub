export const setMobileNumber = (type: string, number: string) => {
  let formattedNumber;

  if (type == 'US') {
    formattedNumber = '+1' + number;
  } else if (type == 'NG') {
    formattedNumber = '+234' + number;
  } else {
    formattedNumber = number;
  }
  return formattedNumber;
};
