import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAxiosPost } from "../../hooks/useAxios";
import { toast } from "sonner";

import agentService from "../../services/agent.service";
import useAuth from "../../hooks/useAuth";
import { ProfileSchema } from "../../validation/agent";
import { Loader2 } from "lucide-react";

export default function ProfileForm() {
  const { reFetchCurrentUser } = useAuth();
  const { fetchData, isLoading, error } = useAxiosPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: joiResolver(ProfileSchema),
  });

  const onSubmit = async (formValues) => {
    try {
      const response = await fetchData({
        apiFn: agentService.updateProfile,
        formValues,
      });
      if (response.success) {
        toast(response.message || "Profile updated successfully.");
        await reFetchCurrentUser();
      }
    } catch (err) {
      console.log(err);
      toast(error || "Update failed. Please try again.");
    }
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
          <Input
            {...register("name", { required: true })}
            type="text"
            id="name"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.name && errors.name.message}
            </p>
          </div>
        </div>

        {/* Phone Number */}
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            {...register("phoneNumber", { required: true })}
            type="text"
            id="phoneNumber"
            autoComplete="true"
            onChange={(e) => {
              /**
               * Checking if input values are numbers
               * value should not exceed 10 numeric character
               */
              if (/^[0-9]+$/.test(e.target.value)) {
                if (e.target.value.length < 10) {
                  setValue("phoneNumber", e.target.value);
                } else {
                  setValue("phoneNumber", e.target.value.slice(0, 10));
                }
              } else {
                setValue("phoneNumber", e.target.value.replace(/[^0-9]/g, ""));
              }
            }}
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.phoneNumber && errors.phoneNumber.message}
            </p>
          </div>
        </div>

        {/* Address Line 1 */}
        <div className="grid gap-2">
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            {...register("addressLine1", { required: true })}
            type="text"
            id="addressLine1"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.addressLine1 && errors.addressLine1.message}
            </p>
          </div>
        </div>

        {/* Address Line 2 */}
        <div className="grid gap-2">
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            {...register("addressLine2", { required: true })}
            type="text"
            id="addressLine2"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.addressLine2 && errors.addressLine2.message}
            </p>
          </div>
        </div>

        {/* City */}
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input
            {...register("city", { required: true })}
            type="text"
            id="city"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.city && errors.city.message}
            </p>
          </div>
        </div>

        {/* State */}
        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <Input
            {...register("state", { required: true })}
            type="text"
            id="state"
            autoComplete="true"
          />
          <div className="h-2">
            <p className="text-red-400 text-sm">
              {errors.state && errors.state.message}
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
