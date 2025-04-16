import React from "react";
import useAuth from "../hooks/useAuth";
import SummaryCard from "./cards/SummaryCard";
import {
  IndianRupee,
  ChartNoAxesCombined,
  ReceiptIndianRupee,
  Landmark,
  Wallet2,
} from "lucide-react";
import { Link } from "react-router-dom";
import PaymentMethodAction from "./Buttons/PaymentMethodAction";
import { Badge } from "./ui/badge";

export default function Wallet() {
  const { user } = useAuth();

  const summary = [
    {
      title: "Total Earnings",
      value: user.totalEarningAmount,
      icon: <ChartNoAxesCombined size={28} color="red" />,
    },
    {
      title: "Pending Withdrawal",
      value: user.pendingWithdrawalAmount,
      icon: <ChartNoAxesCombined size={28} color="brown" />,
    },
    {
      title: "balance",
      value: user.balance,
      icon: <IndianRupee size={28} color="blue" />,
    },
    {
      title: "Pending Balance",
      value: user.pendingBalance,
      icon: <ReceiptIndianRupee size={28} color="green" />,
    },
  ];

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 mt-6 rounded-md sm:grid-cols-2 lg:bg-white lg:border lg:grid-cols-4">
        <SummaryCard
          title={summary[0].title}
          value={summary[0].value}
          icon={summary[0].icon}
          className="bg-red-100"
        />
        <SummaryCard
          title={summary[1].title}
          value={summary[1].value}
          icon={summary[1].icon}
          className="bg-green-100"
        />
        <SummaryCard
          title={summary[2].title}
          value={summary[2].value}
          icon={summary[2].icon}
          className="bg-violet-100"
        />
        <SummaryCard
          title={summary[3].title}
          value={summary[3].value}
          icon={summary[3].icon}
          className="bg-yellow-100"
        />
      </div>

      <div className="grid mt-8 gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Request Withdrawal */}
        <div className="order-2 flex flex-col items-center gap-4 pt-12 pb-6 border rounded-md bg-white">
          <div className="px-3.5 py-4 bg-muted border rounded-md">
            <Wallet2 size={48} />
          </div>
          <Link
            to="/wallet/request-withdrawal"
            className="bg-purple-500 px-4 py-2.5 rounded-md text-white"
          >
            Request Withdrawal
          </Link>
        </div>

        {/* Add Bank Account */}
        <div className="order-3 flex flex-col items-center gap-4 pt-12 pb-4 border rounded-md bg-white">
          <div className="px-3.5 py-4 bg-muted border rounded-md">
            <Landmark size={48} />
          </div>
          <Link
            to="/wallet/add-bank-account"
            className="bg-purple-500 px-4 py-2.5 rounded-md text-white"
          >
            Add New Bank Account
          </Link>
        </div>

        {/* Payment Methods */}
        <div className="order-1 px-4 py-3 border bg-white rounded-md lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-800 ">
            Payment Methods
          </h2>
          <div className="flex flex-col mt-2 gap-4 py-4">
            <div className="grid grid-cols-4 pb-1.5 border-b text-slate-400 text-sm font-medium md:text-base">
              <div className="col-span-2">Bank</div>
              <div>Acc No</div>
              <div className="text-right">Action</div>
            </div>
            {user.bankAccounts.map((acc, index) => (
              <div className="grid grid-cols-4 text-sm text-slate-800 md:text-base">
                <div className="flex gap-2  items-center col-span-2">
                  <span>{acc.bankName}</span>
                  {acc.isPrimary && <Badge className="bg-green-400">P</Badge>}
                </div>
                <div>{acc.accountNumber}</div>
                <div className="flex justify-end">
                  <PaymentMethodAction bankId={acc._id} primary={acc.isPrimary}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
