const daysDifference = (serialDate) => {
  //The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const today = Date.now();
  const difference = Math.abs(serialDate - today);

  //convert back to days
  return Math.round(difference / ONE_DAY);
};

module.exports = 