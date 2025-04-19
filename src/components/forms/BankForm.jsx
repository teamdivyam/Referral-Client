import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useFetchPost } from "../../hooks/useAxios";
import { toast } from "sonner";

import agentService from "../../services/agent.service";
import useAuth from "../../hooks/useAuth";
import { bankSchema } from "../../validation/agent";
import { Loader2 } from "lucide-react";

export default function BankForm() {
  const { reFetchCurrentUser } = useAuth();
  const { fetchPostData, error } = useFetchPost(
    agentService.addBankDetails
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: joiResolver(bankSchema),
    mode: "onBlur",
    shouldFocuseError: true,
    delayError: 300,
    defaultValues: {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    },
  });

  const onSubmit = async (formValues) => {
    try {
      const response = await fetchPostData(formValues);

      if (response.data.success) {
        toast(response.data.message || "Profile updated successfully");
        await reFetchCurrentUser();
      }
    } catch (_) {
      toast(error || "Error in updating profile! Try agin later.");
    } finally {
      reset();
    }
  };

  // Format IFSC code to uppercase
  const formatIFSC = (e) => {
    e.target.value = e.target.value.toUpperCase();
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
          <Input id="bankName" {...register("bankName", { required: true })} />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.bankName && errors.bankName.message}
            </p>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="accountHolderName">Account Holder Name</Label>
          <Input
            id="accountHolderName"
            {...register("accountHolderName", { required: true })}
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
            id="accountNumber"
            {...register("accountNumber", { required: true })}
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
            id="ifscCode"
            {...register("ifscCode", { required: true })}
            onInput={formatIFSC}
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.ifscCode && errors.ifscCode.message}
            </p>
          </div>
        </div>

        <Button type="submit" className="flex gap-0.5" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </div>
    </form>
  );
}
