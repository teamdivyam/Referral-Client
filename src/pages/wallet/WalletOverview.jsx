import React from "react";
import WithdrawalHistory from "../../components/WithdrawalHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wallet from "../../components/Wallet";

export default function WalletOverview() {
  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      {/* Mobile Navigation */}
      <Tabs defaultValue="wallet" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="withdrawal-history">
            Withdrawal History
          </TabsTrigger>
        </TabsList>

        {/* Wallet */}
        <TabsContent value="wallet">
          <Wallet />
        </TabsContent>

        {/* Withdrawal History */}
        <TabsContent value="withdrawal-history">
          <WithdrawalHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
