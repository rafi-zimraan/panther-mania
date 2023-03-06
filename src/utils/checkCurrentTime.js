const checkCurrentTime = () => {
  let today = new Date();
  let curHour = today.getHours();

  if (curHour < 12) {
    return 'PAGI';
  } else if (curHour < 15) {
    return 'SIANG';
  } else if (curHour < 18) {
    return 'SORE';
  } else {
    return 'MALAM';
  }
};

export default checkCurrentTime;
