const { Week, Month } = require("../../Module5/calendar_helper");

describe("Module 5 calendar helpers", () => {
  test("deltaDays returns a new date offset by the requested number of days", () => {
    const date = new Date(2016, 9, 31);

    expect(date.deltaDays(1)).toEqual(new Date(2016, 10, 1));
    expect(date.deltaDays(-31)).toEqual(new Date(2016, 8, 30));
  });

  test("getSunday returns the nearest previous Sunday including the same day", () => {
    expect(new Date(2016, 9, 5).getSunday()).toEqual(new Date(2016, 9, 2));
    expect(new Date(2016, 9, 2).getSunday()).toEqual(new Date(2016, 9, 2));
  });

  test("Week moves forward and backward in seven-day blocks", () => {
    const week = new Week(new Date(2016, 9, 5));

    expect(week.sunday).toEqual(new Date(2016, 9, 2));
    expect(week.nextWeek().sunday).toEqual(new Date(2016, 9, 9));
    expect(week.prevWeek().sunday).toEqual(new Date(2016, 8, 25));
  });

  test("Week contains dates from the same calendar week", () => {
    const week = new Week(new Date(2016, 9, 5));

    expect(week.contains(new Date(2016, 9, 8))).toBe(true);
    expect(week.contains(new Date(2016, 9, 9))).toBe(false);
    expect(week.getDates()).toEqual([
      new Date(2016, 9, 2),
      new Date(2016, 9, 3),
      new Date(2016, 9, 4),
      new Date(2016, 9, 5),
      new Date(2016, 9, 6),
      new Date(2016, 9, 7),
      new Date(2016, 9, 8)
    ]);
  });

  test("Month moves across year boundaries and creates date objects", () => {
    expect(new Month(2016, 11).nextMonth()).toMatchObject({ year: 2017, month: 0 });
    expect(new Month(2016, 0).prevMonth()).toMatchObject({ year: 2015, month: 11 });
    expect(new Month(2016, 9).getDateObject(31)).toEqual(new Date(2016, 9, 31));
  });

  test("Month returns all weeks spanned by the month", () => {
    const weeks = new Month(2016, 9).getWeeks();

    expect(weeks).toHaveLength(6);
    expect(weeks[0].sunday).toEqual(new Date(2016, 8, 25));
    expect(weeks[5].sunday).toEqual(new Date(2016, 9, 30));
  });
});
