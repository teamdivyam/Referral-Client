import { Separator } from "@/components/ui/separator";
import useAuth from "../../hooks/useAuth";
import {
  BadgeCheck,
  Inbox,
  Info,
  TriangleAlert,
  Vote,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import agentService from "../../services/agent.service";
import { Button } from "@/components/ui/button";

const getNotificationIcon = (type) => {
  switch (type) {
    case "REFERRAL_CODE_ALLOTED":
      return <Info className="mr-2" color="blue" />;
    case "WITHDRAWAL":
      return <BadgeCheck className="mr-2" color="green" />;
    case "REFERRAL_CODE_STATUS":
      return <TriangleAlert className="mr-2" color="red" />;
  }
};

const LIMIT = 15;

export default function Notifications() {
  const { user, reFetchCurrentUser } = useAuth();
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const markNotificationRead = async () => {
      if (user.unreadNotificationCount === 0) return;

      try {
        await agentService.markNotificationRead();
        await reFetchCurrentUser();
      } catch (error) {
        console.log("Error in sending response:", error);
      }
    };

    markNotificationRead();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await agentService.getNotifications(page);

        setData(response.data);
        setTotalPages(Math.ceil(response.data.total / LIMIT));
      } catch (error) {
        toast("Error in fetching notification! Try again later.");
      }
    };

    fetchNotifications();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="my-8 mx-4 max-w-[620px] bg-white border rounded-md sm:mx-auto">
      <div className="flex px-4 py-4 justify-between items-center border-b">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-slate-800">
            Notifications
          </h2>
          {user.unreadNotificationCount > 0 && (
            <span className="text-sm text-slate-500">
              You have {user.unreadNotificationCount} new notifications
            </span>
          )}
        </div>
        <Inbox className="text-gray-400" />
      </div>

      {/* If no notification */}
      {data.notifications?.length === 0 && (
        <div className="pt-4 pb-2 text-center text-slate-500">
          No notification for you now!
        </div>
      )}

      <div className="flex flex-col py-7 gap-7 px-4">
        {data.notifications?.map((notification, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-start lg:flex-row"
          >
            <div className="flex gap-2.5">
              <div className="flex justify-center items-center  border rounded-full size-10">
                <Vote className="size-6 text-yellow-400" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-slate-800">
                  New message from divyam
                </span>
                <span className="text-sm text-slate-400">
                  {notification.message}
                </span>
              </div>
            </div>
            <div className="text-slate-400 text-sm pt-2 pl-12 lg:pl-0 lg:pt-0">
              {moment(notification.createdAt).fromNow()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handlePrev}
          variant="outline"
          className="bg-muted/50 mr-4"
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={page === totalPages}
          variant="outline"
          className="bg-muted/50"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
