export type TransactionType = "credit" | "debit" | "refund";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  description?: string;
  category?: string;
}

export type FilterType = "all" | "income" | "expenses";

export interface TransferFormData {
  recipient: string;
  amount: string;
  date: string;
}
