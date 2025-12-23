"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from "lucide-react";
import { useBankStore } from "@/lib/store";
import { useState } from "react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
const BalanceCard = () => {
  const { balance, transactions } = useBankStore();
  const [showBalance, setShowBalance] = useState(true);

  const { totalIncome, totalExpenses } = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === "credit") {
          acc.totalIncome += t.amount;
        } else {
          acc.totalExpenses += t.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0 }
    );
  }, [transactions]);

  return (
    <Card className=" shadow-2xl   bg-zinc-950 text-white  border border-zinc-900">
      <CardContent className="p-6 ">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Total Balance</span>
          <Button
            size="icon"
            className="h-6 w-6  "
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <EyeOff className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
        <div className="mb-6">
          <span className="text-4xl font-bold tracking-tight font-mono">
            {showBalance ? formatCurrency(balance) : "••••••••"}
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg  bg-zinc-900 mt-1">
              <div className="h-8 w-8 rounded-md bg-emerald-500/10 flex items-center justify-center">
                <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Income</p>
                <p className="text-sm font-semibold font-mono">
                  {showBalance ? formatCurrency(totalIncome) : "••••"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg  bg-zinc-900 mt-1 ">
              <div className="h-8 w-8 rounded-md bg-red-500/10 flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expenses</p>
                <p className="text-sm font-semibold font-mono">
                  {showBalance ? formatCurrency(totalExpenses) : "••••"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default BalanceCard;
