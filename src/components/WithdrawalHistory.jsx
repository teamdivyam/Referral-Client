import React from "react";
import { useAxiosGet } from "../hooks/useAxios";
import Loading from "./loading";
import agentService from "../services/agent.service";
import moment from "moment";
import StatusBox from "./status-box";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerForWithdrawalHistory,
} from "@/components/ui/accordion";

export default function WithdrawalHistory() {
  const { data, error, isLoading } = useAxiosGet(
    agentService.getWithdrawalHistory
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="">Error</div>;
  }

  return (
    <div className="flex flex-col space-y-1.5 border mt-8 rounded-md shadow-md bg-white overflow-hidden">
      <div className="grid grid-cols-3 px-4 py-4 bg-purple-500 text-white">
        <p className="text-sm font-medium md:text-base ">Amount</p>
        <p className="text-sm font-medium md:text-base">Date</p>
        <p className="text-sm font-medium text-right -translate-x-5 md:text-base lg:-translate-x-16">
          Status
        </p>
      </div>

      {/* If not any withdrawal done */}
      {data?.withdrawalHistory.length === 0 && (
        <div className="px-4 py-6 flex justify-center items-center  space-y-8">
          Empty Withdrawal History
        </div>
      )}

      {/* Transaction Details */}
      {data?.withdrawalHistory.length > 0 && (
        <Accordion
          type="single"
          collapsible
          className="px-4 py-4 flex flex-col space-y-4 lg:py-6 lg:space-y-2"
        >
          {data.withdrawalHistory.map((transaction, index) => (
            <AccordionItem value={`item-${index}`} className="pt-0 pb-2">
              <AccordionTriggerForWithdrawalHistory
                key={index}
                className="grid grid-cols-3 py-1 items-center hover:cursor-pointer hover:no-underline"
              >
                <p className="text-sm font-medium md:text-base">
                  ₹ {transaction.amount}
                </p>
                <p className="text-sm md:text-base">
                  {moment(transaction.requestedAt).format("MMM Do YY")}
                </p>
                <div className="flex justify-end">
                  <StatusBox status={transaction.status} />
                </div>
              </AccordionTriggerForWithdrawalHistory>
              <AccordionContent>
                <div className="mt-4 border bg-muted/50 px-3 py-4.5 rounded-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Status</p>
                      <p>{transaction.status}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Remarks</p>
                      <p>{transaction.remarks || "---"}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Withdrawal Time</p>
                      <p>
                        {moment(transaction.requestedAt).format(
                          "MMM Do YY, hh:mm A"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
