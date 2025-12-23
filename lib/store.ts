import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Transaction, FilterType } from "./types";
import { initialTransactions, initialBalance } from "./mock-data";

interface BankStore {
  transactions: Transaction[];
  balance: number;
  filter: FilterType;
  isTransferring: boolean;
  transferSuccess: boolean;
  setFilter: (filter: FilterType) => void;
  transfer: (recipient: string, amount: number, date: string) => Promise<void>;
  clearTransferSuccess: () => void;
}
export const useBankStore = create<BankStore>()(
  persist(
    (set) => ({
      balance: initialBalance,
      transactions: initialTransactions,
      filter: "all",
      isTransferring: false,
      transferSuccess: false,
      setFilter: (filter) => set({ filter }),
      transfer: async (recipient, amount, date) => {
        set({ isTransferring: true });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          date,
          description: `Transfer to ${recipient}`,
          amount,
          type: "debit",
          category: "Transfer",
        };
        set((state) => ({
          balance: state.balance - amount,
          transactions: [newTransaction, ...state.transactions],
          isTransferring: false,
          transferSuccess: true,
        }));
      },
      clearTransferSuccess: () => set({ transferSuccess: false }),
    }),
    {
      name: "pocket-bank-storage",
    }
  )
);
