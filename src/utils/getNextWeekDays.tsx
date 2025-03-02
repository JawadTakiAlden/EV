export const getNextWeekDays = () => {
  const td = new Date();
  const days = [...Array(7)].map((_) => {
    let day = td.toLocaleString("en-us", { weekday: "long" });
    let date = td.toLocaleString("en-us", { month: "short", day: "numeric" });
    let fullDate = td.toLocaleDateString("en-us");
    td.setDate(td.getDate() + 1);
    return {
      day,
      date,
      fullDate,
    };
  });
  return days;
};
