"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format-currency";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useBankStore } from "@/lib/store";
const Transferform = () => {
  const {
    balance,
    isTransferring,
    transferSuccess,
    transfer,
    clearTransferSuccess,
  } = useBankStore();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (transferSuccess) {
      const timer = setTimeout(() => {
        clearTransferSuccess();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [transferSuccess, clearTransferSuccess]);

  const validateForm = (): boolean => {
    setError("");

    if (!recipient.trim()) {
      setError("Please enter a recipient name");
      return false;
    }

    const amountNum = Number.parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Amount must be greater than $0");
      return false;
    }

    if (amountNum > balance) {
      setError(`Insufficient Funds. Available: ${formatCurrency(balance)}`);
      return false;
    }

    if (!date) {
      setError("Please select a date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await transfer(recipient, Number.parseFloat(amount), date);

    setRecipient("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setError("");
  };
  return (
    <Card className="shadow-2xl   bg-zinc-950 text-white  border border-zinc-900">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-foreground flex items-center justify-center">
            <Send className="h-4 w-4 text-background" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Send Money</h3>
            <p className="text-xs text-muted-foreground">
              Transfer funds securely
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4  bg-zinc-950 ">
        {/* Success Message */}
        {transferSuccess && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium">
              Transfer completed successfully!
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Recipient */}
          <div className="space-y-1.5">
            <Label htmlFor="recipient" className="text-xs ">
              Recipient Name
            </Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter name"
              className="h-10 bg-zinc-900  border-0 focus-visible:ring-1 focus-visible:ring-ring  "
              disabled={isTransferring}
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="amount" className="text-xs ">
              Amount
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder=" $0.00"
                className="h-10 bg-zinc-900  border-0 focus-visible:ring-1 focus-visible:ring-ring "
                disabled={isTransferring}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Available:{" "}
              <span className="font-mono">{formatCurrency(balance)}</span>
            </p>
          </div>

          {/* Date */}
          <div className="space-y-1.5 text-white">
            <Label htmlFor="date" className="text-xs ">
              Transfer Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 bg-zinc-900  border-0 focus-visible:ring-1 focus-visible:ring-ring  text-white "
              disabled={isTransferring}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 font-medium"
            disabled={isTransferring}
          >
            {isTransferring ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Money
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default Transferform;
