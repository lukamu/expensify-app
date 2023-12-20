import { addDays, subDays } from "date-fns";

export default [
  {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: new Date(0),
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    createdAt: subDays(new Date(0), 4),
  },
  {
    id: "3",
    description: "Credit Card",
    note: "",
    amount: 4500,
    createdAt: addDays(new Date(0), 4),
  },
];
