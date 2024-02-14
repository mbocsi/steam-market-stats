export function getYearRange(
  priceHistory: [string, number, number][],
  cur_date: Date
) {
  const year_date = new Date(cur_date);
  year_date.setFullYear(year_date.getFullYear() - 1);
  year_date.setHours(0, 0, 0, 0);

  const yearPrice = priceHistory.filter((point) => {
    const this_date = new Date(point[0]);
    return this_date.getTime() >= year_date.getTime();
  });
  const year_min = yearPrice.reduce((acc, current) => [
    current[0],
    Math.min(acc[1], current[1]),
    current[2],
  ]);

  const year_max = yearPrice.reduce((acc, current) => [
    current[0],
    Math.max(acc[1], current[1]),
    current[2],
  ]);

  return { min: year_min[1], max: year_max[1] };
}

export function getDayRange(
  priceHistory: [string, number, number][],
  cur_date: Date
) {
  const day_date = new Date(cur_date);
  day_date.setHours(0, 0, 0, 0);

  const dayPrice = priceHistory.filter((point) => {
    const this_date = new Date(point[0]);
    return this_date.getTime() >= day_date.getTime();
  });
  const day_min = dayPrice.reduce((acc, current) => [
    current[0],
    Math.min(acc[1], current[1]),
    current[2],
  ]);

  const day_max = dayPrice.reduce((acc, current) => [
    current[0],
    Math.max(acc[1], current[1]),
    current[2],
  ]);

  return { min: day_min[1], max: day_max[1] };
}

export function getTimestampPrice(
  priceHistory: [string, number, number][],
  cur_date: Date
) {
  const day_date = new Date(cur_date);
  day_date.setHours(0, 0, 0, 0);
  const cur_year = day_date.getFullYear();
  const cur_month = day_date.getMonth();
  const cur_day = day_date.getDate();

  const lifetime = priceHistory[0];

  const year5_date = new Date(day_date);
  year5_date.setFullYear(cur_year - 5);
  const year5 = priceHistory.find((point) => {
    const this_date = new Date(point[0]);
    this_date.setHours(0, 0, 0, 0);
    return this_date.getTime() == year5_date.getTime();
  });

  const year3_date = new Date(day_date);
  year3_date.setFullYear(cur_year - 3);
  const year3 = priceHistory.find((point) => {
    const this_date = new Date(point[0]);
    this_date.setHours(0, 0, 0, 0);
    return this_date.getTime() == year3_date.getTime();
  });

  const year1_date = new Date(day_date);
  year1_date.setFullYear(cur_year - 1);
  const year1 = priceHistory.find((point) => {
    const this_date = new Date(point[0]);
    this_date.setHours(0, 0, 0, 0);
    return this_date.getTime() == year1_date.getTime();
  });

  const month3_date = new Date(day_date);
  month3_date.setMonth(cur_month - 3);
  const month3 = priceHistory.find((point) => {
    const this_date = new Date(point[0]);
    this_date.setHours(0, 0, 0, 0);
    return this_date.getTime() == month3_date.getTime();
  });

  const month1_date = new Date(day_date);
  month1_date.setMonth(cur_month - 1);
  const month1 = priceHistory.find((point) => {
    const this_date = new Date(point[0]);
    this_date.setHours(0, 0, 0, 0);
    return this_date.getTime() == month1_date.getTime();
  });

  const day7_date = new Date(day_date);
  day7_date.setDate(cur_day - 7);
  const day7 = priceHistory.find((point) => {
    const this_date = new Date(point[0]);
    this_date.setHours(0, 0, 0, 0);
    return this_date.getTime() == day7_date.getTime();
  });
  return {
    day7: day7 ? day7[1] : null,
    month1: month1 ? month1[1] : null,
    month3: month3 ? month3[1] : null,
    year1: year1 ? year1[1] : null,
    year3: year3 ? year3[1] : null,
    year5: year5 ? year5[1] : null,
    lifetime: lifetime ? lifetime[1] : null,
  };
}

export function getClose(
  priceHistory: [string, number, number][],
  cur_date: Date
) {
  const day_date = new Date(cur_date);
  day_date.setHours(0, 0, 0, 0);
  const close = priceHistory.find((point) => {
    const this_date = new Date(point[0]);
    return day_date.getTime() === this_date.getTime();
  });
  if (close) return close[1];
  else return null;
}
