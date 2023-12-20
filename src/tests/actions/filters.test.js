import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
} from "../../actions/filters";

test("should generate set start date action object", () => {
  const action = setStartDate(new Date(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: new Date(0),
  });
});

test("should generate set end date action object", () => {
  const action = setEndDate(new Date(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: new Date(0),
  });
});

test("should generate set text filter action object with text value", () => {
  const text = "Something in";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text,
  });
});

test("should generate set text filter action object with default value", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});

test("should generate action object for sort by date", () => {
  expect(sortByDate()).toEqual({
    type: "SORT_BY_DATE",
  });
});

test("should generate action object for sort by amount", () => {
  expect(sortByAmount()).toEqual({
    type: "SORT_BY_AMOUNT",
  });
});
