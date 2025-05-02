import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { joiResolver } from "@hookform/resolvers/joi";

import useAuth from "../../hooks/useAuth";
import agentService from "../../services/agent.service";
import { useFetchPost } from "../../hooks/useAxios";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { requestAmountSchema } from "../../validation/agent";

export default function RequestWithdrawal() {
  const { user, reFetchCurrentUser } = useAuth();
  const [exceedAmountWarn, setExceedAmountWarn] = useState(false);
  const { error, loading, fetchPostData } = useFetchPost(
    agentService.requestWithdrawal
  );

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(requestAmountSchema),
  });

  const onSubmit = async (formValues) => {
    try {
      const response = await fetchPostData(formValues);

      if (response.data.success) {
        toast(response.data.message || "Withdrawal request has been created.");
        await reFetchCurrentUser();
      }
    } catch (_) {
      toast(error || "Error in creating withdrawal request! Try agin later.", {
        variant: "destructive",
      });
    } finally {
      reset();
    }
  };

  const formatNumber = (e) => {
    const input = e.target.value.replace(/\D|\b0/g, "");
    e.target.value = input;
  };

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl">
        Request Withdrawal
      </h2>
      <Separator className="my-4" />

      <div className="mt-6 border bg-white w-full max-w-[540px] m-auto px-2 py-3 rounded-md lg:mt-8 lg:py-4 lg:px-6">
        <div className="flex w-full justify-between">
          <span className="font-semibold">Total Withdrawal Amount</span>
          <div className="flex items-center gap-0.5">
            <IndianRupee size={18} />
            <span>{user.balance}</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-gray-500 text-sm leading-7 [&:not(:first-child)]:mt-6">
            Amount is credit to your account after 2 or 3 days.
          </p>
        </div>

        {user.balance < user.MINIMUM_WITHDRAWAL_AMOUNT ? (
          <div className="text-sm text-red-400 py-2.5">You have no minium withdrawal amount which is 5000/-</div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid mt-6 items-center gap-4"
          >
            <Label htmlFor="name" className="text-right">
              Amount
            </Label>
            <Input
              id="name"
              className="bg-white"
              {...register("amount")}
              onInput={formatNumber}
              onChange={(e) => {
                if (parseInt(e.target.value) > user.balance) {
                  return setExceedAmountWarn(true);
                }
                setExceedAmountWarn(false);
              }}
            />
            <div className="flex flex-col">
              {exceedAmountWarn && (
                <p className="text-sm text-red-400">
                  Amount exceeded current withdrawal amount.
                </p>
              )}
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-40"
              disabled={exceedAmountWarn || loading || isSubmitting}
            >
              {loading || isSubmitting ? "Requesting..." : "Request"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
