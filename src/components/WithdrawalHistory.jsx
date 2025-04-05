import React from "react";
import { useAxiosGet } from "../hooks/useAxios";
import Loading from "./loading";
import { IndianRupee } from "lucide-react";
import agentService from "../services/agent.service";

export default function WithdrawalHistory() {
  const { data, error, isLoading } = useAxiosGet(
    agentService.getWithdrawalHistory
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="">Error</div>
  }

  return (
    <div className="flex flex-col space-y-1.5 border mt-8 rounded-md shadow-md overflow-hidden">
      <div className="grid grid-cols-3 px-4 py-4 bg-purple-500 text-white">
        {/* <div className="hidden lg:block">Transaction ID</div> */}
        <div>Amount Withdrawal</div>
        <div>Date</div>
        <div className="hidden lg:block">Withdrawal Status</div>
      </div>

      {/* If not any withdrawal done */}
      {data?.withdrawalHistory.length === 0 && (
        <div className="px-4 py-6 flex justify-center items-center  space-y-8">
          Empty Withdrawal History
        </div>
      )}

      {/* Transaction Details */}
      {data?.withdrawalHistory.length > 0 && (
        <div className="px-4 py-6 flex flex-col space-y-8">
          {data.withdrawalHistory.map((transaction, index) => (
            <div key={index} className="grid grid-cols-3">
              {/* <div className="hidden lg:block">{transaction.id}</div> */}
              <div className="flex items-center gap-0.5">
                <IndianRupee size={20} />
                {transaction.amount}
              </div>
              <div>{new Date(transaction.requestedAt).toDateString()}</div>
              <div className="hidden lg:block">{transaction.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
