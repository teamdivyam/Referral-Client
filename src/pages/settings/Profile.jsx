import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilLineIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl">
        My Profile
      </h2>
      <Separator className="my-4" />

      <div className="flex flex-col space-y-6 justify-between mt-6 border bg-muted/50 w-full max-w-[740px] m-auto px-2 py-3 rounded-md md:flex-row md:space-y-0 md:items-center lg:mt-8 lg:py-4 lg:px-6">
        <div className="flex items-center gap-7">
          <div className="size-24 bg-muted rounded-full overflow-hidden">
            <img src="https://github.com/shadcn.png" alt="Profile" />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-lg font-semibold">{user.name}</span>
            <span className="text-xs font-medium text-muted-foreground">
              {user.address.city}, {user.address.state}
            </span>
            <Badge variant="primary">Verified</Badge>
          </div>
        </div>

        {/* Dialog form edit for name and profile picture change */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              Edit
              <PencilLineIcon className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Your Name</DialogTitle>
              <DialogDescription>
                Make changes to your profile here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={user.name || ""}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 border bg-muted/50 w-full max-w-[740px] m-auto px-4 py-5 rounded-md lg:mt-8 lg:py-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          <h3 className="scroll-m-20 text-base font-semibold tracking-tight first:mt-0 lg:text-lg">
            Personal Information
          </h3>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Edit
                <PencilLineIcon className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit personal information</DialogTitle>
                <DialogDescription>
                  Make changes to your personal information here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={user.name || ""}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>

        <div className="mt-6 grid grid-cols-1 space-y-4 md:grid-cols-2">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">Name</span>
            <span className="text-sm">{user.name}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">Email Address</span>
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">Phone</span>
            <span className="text-sm">+91 {user.phoneNumber}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 border bg-muted/50 w-full max-w-[740px] m-auto px-4 py-5 rounded-md lg:mt-8 lg:py-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          <h3 className="scroll-m-20 text-base font-semibold tracking-tight first:mt-0 lg:text-lg">
            Address
          </h3>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                Edit
                <PencilLineIcon className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>

        <div className="mt-6 grid grid-cols-1 space-y-4 md:grid-cols-2">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">Address Line 1</span>
            <span className="text-sm">{user.address.addressLine1}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">Address Line 2</span>
            <span className="text-sm">{user.address.addressLine2}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">City</span>
            <span className="text-sm">{user.address.city}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-600">State</span>
            <span className="text-sm">{user.address.state}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
