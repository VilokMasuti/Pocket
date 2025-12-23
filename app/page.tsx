import BalanceCard from "@/components/cards/BalanceCard";
import { TransactionList } from "@/components/cards/TransactionList";
import Transferform from "@/components/Form/Transferform";
import { DashboardHeader } from "@/components/Header/DashboardHeader";

const page = () => {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Page Title */}
        <DashboardHeader />
        <div className=" mt-3">
          <h1 className="text-2xl font-bold tracking-tight  font-mono text-slate-300 uppercase">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your finances
          </p>
        </div>
        {/* Main Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 mt-3">
            <BalanceCard />
            <TransactionList />
          </div>
          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <Transferform />
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-12 py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-xs   text-white font-mono ">
            Pocket Bank · Built By - VILOK
          </p>
        </div>
      </footer>
    </>
  );
};
export default page;
