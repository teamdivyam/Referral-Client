import { Separator } from "@/components/ui/separator";
import useAuth from "../../hooks/useAuth";
import { BadgeCheck, Info, TriangleAlert } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import agentService from "../../services/agent.service";

const getNotificationIcon = (type) => {
  switch (type) {
    case "REFERRAL_CODE_ALLOTED":
      return <Info className="mr-2" color="blue" />
    case "WITHDRAWAL":
      return <BadgeCheck className="mr-2" color="green" />
    case "REFERRAL_CODE_STATUS":
      return <TriangleAlert className="mr-2" color="red" />
  }
}

export default function Notifications() {
  const { user } = useAuth();

  useEffect(() => {
    const markNotificationRead = async () => {
      if (user.unreadNotificationCount === 0) return;

      try {
        await agentService.markNotificationRead();
      } catch (error) {
        console.log("Error in sending response:", error);
      }
    }

    markNotificationRead();
  }, [])

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl">
        Notifications
      </h2>
      <Separator className="my-4" />

      <div className="flex flex-col space-y-6 justify-between mt-6 border bg-muted/50 w-full max-w-[540px] m-auto px-2 py-3 rounded-md md:space-y-0 lg:mt-8 lg:py-4 lg:px-6">
        {user.notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start border-b py-3 last:border-b-0"
          >
            {getNotificationIcon(notification.type)}
            <div className="flex flex-col justify-start">
              <p className="text-sm lg:text-base">{notification.message}</p>
              <p className="text-xs text-muted-foreground">
                {moment(notification.createdAt).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
