import React from "react";
import useAuth from "../hooks/useAuth";

export default function Wallet() {
  const { user } = useAuth();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <div className="border px-3 py-4.5 rounded-md shadow-md flex flex-col justify-center">
          <h1 className="text-sm font-semibold">Withdrawal Amount</h1>
          <h1 className="text-3xl font-medium">₹ {user.withdrawalAmount}</h1>
        </div>
        <div className="border px-3 py-4.5 rounded-md shadow-md flex flex-col justify-center">
          <h1 className="text-sm font-semibold">Pending Balance</h1>
          <h1 className="text-3xl font-medium">₹ {user.pendingBalance}</h1>
        </div>
        <div className="border px-3 py-4.5 rounded-md shadow-md flex flex-col justify-center">
          <h1 className="text-sm font-semibold">Total Withdrawal</h1>
          <h1 className="text-3xl font-medium">₹ {user.totalWithdrawal || 0}</h1>
        </div>
      </div>      
    </div>
  );
}












