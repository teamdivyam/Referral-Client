import { Code, FileDigit, User, IdCard, Landmark } from "lucide-react";
import { useAxiosGet } from "../../hooks/useAxios";
import agentService from "../../services/agent.service";
import Loading from "../../components/loading";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function YourBankDetails() {
  const { data, error, isLoading } = useAxiosGet(agentService.getBankDetails);

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div>Error</div>
    )
  }
  

  if (data?.bankAccounts.length === 0) {
    return (
      <div className="flex min-h-screen px-4 py-6 justify-center items-center lg:px-6 lg:py-8">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h1 className="text-2xl font-bold">Please Add Your Bank Details!</h1>
          <Link
            to="#"
            className="px-4 py-2 text-lg font-semibold bg-purple-600 text-purple-100 rounded-lg"
          >
            Add Bank
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex px-4 py-6 justify-center items-center lg:px-6 lg:py-8">
      <div className="flex flex-col space-y-12">
        {data?.bankAccounts.map((account, index) => (
          <div key={index}>
            <h2 className="pb-4 text-xl">{account.bankName}</h2>
            <Accordion
              type="single"
              collapsible
              className="flex flex-col space-y-5 w-full max-w-2xl md:min-w-xl"
            >
              <AccordionItem
                value="item-2"
                className="rounded-md bg-purple-300 cursor-pointer"
              >
                <AccordionTrigger className="px-4">
                  <div className="flex gap-2 items-center ">
                    <User size={18} />
                    <p>Account Holder Name</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-3 px-4 bg-muted">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{account.accountHolderName}</p>
                    </div>
                    <div>
                      <button className="text-sm bg-purple-400 text-purple-50 px-2 py-1 rounded-md">
                        Edit
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="rounded-md bg-purple-300 cursor-pointer"
              >
                <AccordionTrigger className="px-4">
                  <div className="flex gap-2 items-center ">
                    <Code size={18} />
                    <p>IFSC Code</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-3 px-4 bg-muted">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{account.ifscCode}</p>
                    </div>
                    <div>
                      <button className="text-sm bg-purple-400 text-purple-50 px-2 py-1 rounded-md">
                        Edit
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="rounded-md bg-purple-300 cursor-pointer"
              >
                <AccordionTrigger className="px-4">
                  <div className="flex gap-2 items-center ">
                    <FileDigit size={18} />
                    <p>Account Number</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-3 px-4 bg-muted">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{account.accountNumber}</p>
                    </div>
                    <div>
                      <button className="text-sm bg-purple-400 text-purple-50 px-2 py-1 rounded-md">
                        Edit
                      </button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
