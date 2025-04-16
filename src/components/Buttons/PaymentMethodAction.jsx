import {
  Ellipsis,
  Award,
  ReceiptText,
  CircleX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import agentService from "../../services/agent.service";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";

export default function PaymentMethodAction({ bankId, primary }) {
  const { reFetchCurrentUser } = useAuth();

  const handleSetPrimaryAccount = async (bankId) => {
    try {
        const response = await agentService.setPrimaryAccount(bankId);

        if (response.success) {
            toast("Primary account set successfully.");
        }

        await reFetchCurrentUser();
    } catch (error) {
        toast("Internal Server Error");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 -translate-x-2.5">
        <DropdownMenuLabel>Bank Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {!primary && (
            <DropdownMenuItem
              onClick={() => handleSetPrimaryAccount(bankId)}
            >
              <Award />
              <span>Set Primary</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => {
              //   navigate("/wallet/request-withdrawal");
            }}
          >
            <ReceiptText />
            <span>View Details</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <CircleX className="text-red-500" />
          <span className="text-red-500">Remove Account</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
