import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAxiosPost } from "../../hooks/useAxios";
import { toast } from "sonner";

import agentService  from "../../services/agent.service";
import useAuth from "../../hooks/useAuth";
import { BankDetailsSchema } from "../../validation/agent";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BankForm() {
  const { reFetchCurrentUser } = useAuth();
  const { fetchData, isLoading, error } = useAxiosPost();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(BankDetailsSchema),
  });

  const onSubmit = async (formValues) => {
    try {
      const response = await fetchData({
        apiFn: agentService.addBankDetails,
        formValues,
      });

      if (response.success) {
        toast(response.message || "Bank details are added");
        await reFetchCurrentUser();
        navigate("/wallet/wallet-overview");
      }
    } catch (err) {
      console.log("Bankform error", err); 
      toast(error || "Add bank details is failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 py-5 lg:px-6 lg:py-7"
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl text-blue-600 font-bold">
          Complete Your Bank Details
        </h1>
        <div className="grid gap-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            {...register("bankName", { required: true })}
            type="text"
            id="bankName"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.bankName && errors.bankName.message}
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="accountHolderName">Account Holder Name</Label>
          <Input
            {...register("accountHolderName", { required: true })}
            type="text"
            id="accountHolderName"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.accountHolderName && errors.accountHolderName.message}
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            {...register("accountNumber", { required: true })}
            type="text"
            id="accountNumber"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.accountNumber && errors.accountNumber.message}
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            {...register("ifscCode", { required: true })}
            type="text"
            id="ifscCode"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.ifscCode && errors.ifscCode.message}
            </p>
          </div>
        </div>
        

        <Button type="submit" className="flex gap-0.5" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Please Wait</span>
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </div>
    </form>
  );
}
