import { isBefore, isAfter, isSameDay } from "date-fns";

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const createdAt = new Date(expense.createdAt);
      const startDateMatch = startDate
        ? isSameOrBefore(startDate, createdAt)
        : true;
      const endDateMatch = endDate ? isSameOrAfter(endDate, createdAt) : true;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

function isSameOrBefore(date1, date2) {
  return isSameDay(date1, date2) || isBefore(date1, date2);
}

function isSameOrAfter(date1, date2) {
  return isSameDay(date1, date2) || isAfter(date1, date2);
}
