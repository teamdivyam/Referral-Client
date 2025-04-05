import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function AvatarProfile() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>AS</AvatarFallback>
    </Avatar>
  );
}

export function ProfileDropdownMenu({
  data,
  setCurrentPage,
  setSubCurrentPage,
}) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <AvatarProfile />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 -translate-x-2.5">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              // Set the current page and subcurrent page index for breadcrumbs
              setCurrentPage(3);
              setSubCurrentPage(4);
              navigate(data.navMain[3].items[4].url);
            }}
          >
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              // Set the current page and subcurrent page index for breadcrumbs
              setCurrentPage(1);
              setSubCurrentPage(1);
              navigate(data.navMain[1].items[1].url);
            }}
          >
            <CreditCard />
            <span>Request Withdraw</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LifeBuoy />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
