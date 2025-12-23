"use client";

import type React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/format-currency";
import {
  ArrowDownLeft,
  Coffee,
  ShoppingBag,
  Zap,
  Building2,
  Send,
  Banknote,
  CreditCard,
  Receipt,
} from "lucide-react";
import { useBankStore } from "@/lib/store";
import type { FilterType } from "@/lib/types";

const categoryIcons: Record<string, React.ReactNode> = {
  "Food & Dining": <Coffee className="h-4 w-4" />,
  Shopping: <ShoppingBag className="h-4 w-4" />,
  Utilities: <Zap className="h-4 w-4" />,
  Salary: <Building2 className="h-4 w-4" />,
  Transfer: <Send className="h-4 w-4" />,
  Freelance: <Banknote className="h-4 w-4" />,
  Payment: <CreditCard className="h-4 w-4" />,
};

export function TransactionList() {
  const { transactions, filter, setFilter } = useBankStore();

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    if (filter === "income") return t.type === "credit";
    return t.type === "debit";
  });

  const getIcon = (category?: string) => {
    if (category && categoryIcons[category]) {
      return categoryIcons[category];
    }
    return <Receipt className="h-4 w-4" />;
  };

  return (
    <Card className=" shadow-2xl   bg-zinc-950 text-white  border border-zinc-900">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium">Transactions</h3>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions.length} total
            </p>
          </div>

          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as FilterType)}
          >
            <TabsList className="h-8 p-0.5 cursor-pointer   bg-zinc-700 text-white">
              <TabsTrigger
                value="all"
                className="h-7 px-3 text-xs cursor-pointer  not-[]:"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="income"
                className="h-7 px-3 text-xs  cursor-pointer "
              >
                Income
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="h-7 px-3 text-xs cursor-pointer "
              >
                Expenses
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="p-0 ">
        <ScrollArea className="h-[380px] ">
          <div className="divide-y   divide-black">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <Receipt className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No transactions found
                </p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between px-6 py-3 hover:bg-zinc-900 duration-700 transition-colors cursor-pointer "
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="h-9 w-9 rounded-lg  flex items-center justify-center shrink-0  cursor-pointer  text-white">
                      {transaction.type === "credit" ? (
                        <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
                      ) : (
                        getIcon(transaction.category)
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {transaction.description}
                      </p>
                      <p className="text-xs cursor-pointer  ">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                        {transaction.category && ` · ${transaction.category}`}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-mono font-medium shrink-0 ml-3 ${
                      transaction.type === "credit"
                        ? "text-emerald-500"
                        : " text-red-500"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
