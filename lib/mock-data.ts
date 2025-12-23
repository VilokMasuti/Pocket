import type { Transaction } from "./types";

export const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-12-20",
    description: "Salary Deposit",
    amount: 5000,
    type: "credit",
    category: "Income",
  },
  {
    id: "2",
    date: "2024-12-19",
    description: "Starbucks",
    amount: 8.5,
    type: "debit",
    category: "Food & Drink",
  },
  {
    id: "3",
    date: "2024-12-18",
    description: "Amazon Purchase",
    amount: 124.99,
    type: "debit",
    category: "Shopping",
  },
  {
    id: "4",
    date: "2024-12-17",
    description: "Freelance Payment",
    amount: 750,
    type: "credit",
    category: "Income",
  },
  {
    id: "5",
    date: "2024-12-16",
    description: "Electric Bill",
    amount: 85.2,
    type: "debit",
    category: "Utilities",
  },
  {
    id: "6",
    date: "2024-12-15",
    description: "Grocery Store",
    amount: 67.45,
    type: "debit",
    category: "Groceries",
  },
  {
    id: "7",
    date: "2024-12-14",
    description: "Netflix",
    amount: 15.99,
    type: "debit",
    category: "Entertainment",
  },
  {
    id: "8",
    date: "2024-12-13",
    description: "Refund",
    amount: 45.0,
    type: "credit",
    category: "Refund",
  },
];

export const initialBalance = 12500.0;
