import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import agentService from "../../services/agent.service";
import useAuth from "../../hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { joiResolver } from "@hookform/resolvers/joi";
import { useFetchPost } from "../../hooks/useAxios";
import { profileSchema } from "../../validation/agent";
import { useState } from "react";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export default function ProfileForm() {
  const [disabled, setDisabled] = useState(false);
  const { reFetchCurrentUser } = useAuth();
  const { fetchPostData, error, loading } = useFetchPost(
    agentService.updateProfile
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: joiResolver(profileSchema),
    mode: "onBlur",
    shouldFocuseError: true,
    delayError: 300,
    disabled,
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: ""
    },
  });

  const onSubmit = async (formValues) => {
    setDisabled(true);

    try {
      const response = await fetchPostData(formValues);

      if (response.data.success) {
        toast(response.data.message || "Profile updated successfully");
        await reFetchCurrentUser();
      }
    } catch (_) {
      console.log(_);
      toast(error || "Error in updating profile! Try agin later.");
    } finally {
      reset();
      setDisabled(false);
    }
  };

  const formatPhoneNumber = (e) => {
    const input = e.target.value.replace(/\D/g, "").substring(0, 10);
    e.target.value = input;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 py-5 lg:px-6 lg:py-7"
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl text-blue-600 font-bold">
          Complete Your Profile
        </h1>

        {/* Name */}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} className="bg-muted" />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            className="bg-muted"
            {...register("phoneNumber")}
            onInput={formatPhoneNumber}
            maxLength={10}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Address Line 1 */}
        <div className="grid gap-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            id="addressLine1"
            className="bg-muted"
            {...register("addressLine1", { required: true })}
          />
          {errors.addressLine1 && (
            <p className="mt-1 text-sm text-red-600">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="grid gap-2">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            id="addressLine2"
            className="bg-muted"
            {...register("addressLine2", { required: true })}
          />
          {errors.addressLine2 && (
            <p className="mt-1 text-sm text-red-600">
              {errors.addressLine2.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            className="bg-muted"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <Select
            onValueChange={(value) => setValue("state", value)} // Set value using setValue
          >
            <SelectTrigger className="w-full bg-muted">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <Button type="submit" className="flex gap-0.5" disabled={loading}>
          {loading || isSubmitting ? (
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
