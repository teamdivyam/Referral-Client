import React, { useState } from "react";
import WithdrawalHistory from "../../components/WithdrawalHistory";
import Wallet from "../../components/Wallet";

export default function WalletOverview() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Wallet", component: <Wallet /> },
    { name: "Withdrawal History", component: <WithdrawalHistory /> },
  ];
  
  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <div className="mt-4 max-w-64 flex justify-between border rounded-md bg-white overflow-hidden">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveTab(index);
            }}
            className={`px-4 py-2.5 text-medium cursor-pointer ${activeTab === index && "text-white bg-purple-600"}`}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
}
