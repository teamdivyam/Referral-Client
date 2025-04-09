import Joi from "joi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { joiResolver } from "@hookform/resolvers/joi";

import useAuth from "../../hooks/useAuth";
import agentService from "../../services/agent.service";
import { useAxiosPost } from "../../hooks/useAxios";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";

// Create a joi schema for amount validation
const AmountSchema = Joi.object({
  amount: Joi.number().required().messages({
    "number.base": "Amount must be a number",
    "number.empty": "Amount is required",
    "any.required": "Amount is required",
  }),
});

export default function RequestWithdrawal() {
  const { user } = useAuth();
  const [exceedAmountWarn, setExceedAmountWarn] = useState(false);
  const { fetchData, isLoading, error } = useAxiosPost();

  const {
    setValue,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: joiResolver(AmountSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Handle form submission logic here
    try {
      console.log(data);
      const response = await fetchData({
        apiFn: agentService.requestWithdrawal,
        formValues: data,
      });

      if (response.success) {
        // Reset the form after successful submission
        reset();
        setExceedAmountWarn(false);

        toast("Withdrawal request submitted successfully", {
          variant: "success",
        });

        // redirect agent to withdrawal page
        setTimeout(() => {
          navigate("/wallet/wallet-overview");
        }, 2000);
      }
    } catch (err) {
      console.error("Request withdrawal error:", error);
      toast("Failed to submit withdrawal request", { variant: "destructive" });
    }
  };

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl">
        Request Withdrawal
      </h2>
      <Separator className="my-4" />

      <div className="mt-6 border bg-muted/50 w-full max-w-[540px] m-auto px-2 py-3 rounded-md lg:mt-8 lg:py-4 lg:px-6">
        <div className="flex w-full justify-between">
          <span className="font-semibold">Total Withdrawal Amount</span>
          <div className="flex items-center gap-0.5">
            <IndianRupee size={18} />
            <span>{user.currentWithdrawalAmount}</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-gray-500 text-sm leading-7 [&:not(:first-child)]:mt-6">
            Amount is credit to your account after 2 or 3 days.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid mt-6 items-center gap-4"
        >
          <Label htmlFor="name" className="text-right">
            Amount
          </Label>
          <Input
            {...register("amount", {
              required: true,
            })}
            id="name"
            type="number"
            className="bg-white"
            onChange={(e) => {
              if (/^[0-9]+$/.test(e.target.value)) {
                if (e.target.value < 1) {
                  e.target.value = 1;
                }
                if (e.target.value > parseInt(user.currentWithdrawalAmount)) {
                  setExceedAmountWarn(true);
                } else {
                  setExceedAmountWarn(false);
                }
              } else {
                setValue("amount", e.target.value.replace(/[^0-9]/g, ""));
              }
            }}
          />
          <div>
            {exceedAmountWarn && (
              <p className="text-sm text-red-400">
                Amount exceeded current withdrawal amount.
              </p>
            )}
          </div>
          <Button className="w-40" disabled={exceedAmountWarn || isLoading}>
            Request
          </Button>
        </form>
      </div>
    </div>
  );
}
