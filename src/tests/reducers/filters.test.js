import filterReducer from "../../reducers/filters";
import { subDays, startOfDay } from "date-fns";

test("should setup default filter values", () => {
  const state = filterReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: startOfDay(subDays(new Date(), 2)),
    endDate: startOfDay(new Date()),
  });
});

test("should set sortBy to amount", () => {
  const state = filterReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to amount", () => {
  const currentState = {
    text: "",
    startDate: undefined,
    emdDate: undefined,
    sortBy: "amount",
  };

  const action = {
    type: "SORT_BY_DATE",
  };
  const state = filterReducer(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "This is my filter";

  const action = {
    type: "SET_TEXT_FILTER",
    text,
  };
  const state = filterReducer(undefined, action);
  expect(state.text).toBe(text);
});

test("should set startDate filter", () => {
  const startDate = new Date();

  const action = {
    type: "SET_START_DATE",
    startDate,
  };
  const state = filterReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

test("should set endDate filter", () => {
  const endDate = new Date();

  const action = {
    type: "SET_END_DATE",
    endDate,
  };
  const state = filterReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
