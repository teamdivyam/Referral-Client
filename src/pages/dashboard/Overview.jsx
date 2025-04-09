import useAuth from "../../hooks/useAuth";
import {
  CheckCircle,
  Copy,
  Share,
  Clock,
  XCircle,
  IndianRupee,
} from "lucide-react";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";
import getGreetingTime from "../../lib/greetingTime";
import Loading from "@/components/loading";

import copy from "copy-to-clipboard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAxiosGet } from "../../hooks/useAxios";
import agentService from "../../services/agent.service";

export default function Overview() {
  const { user } = useAuth();
  const { data, error, isLoading } = useAxiosGet(agentService.getOverview);


  const referralAnalytics = [
    {
      title: "Total Referrals",
      value: data?.used,
    },
    {
      title: "Total Earnings",
      value: user.totalEarningAmount,
    },
    {
      title: "Total Withdrawal",
      value: user.totalWithdrawalAmount,
    },
    {
      title: "Balance",
      value: user.currentWithdrawalAmount,
    },
    {
      title: "Pending Balance",
      value: user.pendingBalance,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {!(
        user.userProfileCompleteStatus.profile &&
        user.userProfileCompleteStatus.bank
      ) && (
        <div className="flex flex-col space-x-4 space-y-1.5 px-4 py-5 bg-red-200 border-l-6 border-red-400 md:flex-row">
          <p className="text-sm">
            Complete your profile to become a 100% verified user
          </p>
          <Link
            to="/settings/complete-your-profile"
            className="w-28 text-sm text-center py-0.5 rounded-md  bg-red-300 border border-red-400"
          >
            Click Here
          </Link>
        </div>
      )}
      <div className="px-4 py-6 lg:px-6 lg:py-8">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          <span className="text-blue-500">{getGreetingTime()}!</span>{" "}
          {user.name}
        </h2>

        <div className="mt-12 max-w-5xl grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {referralAnalytics.map((item) => (
            <Card
              key={item.title}
              className="gap-4 bg-purple-200 p-0 overflow-hidden"
            >
              <div className="size-full py-6 border-l-6 border-purple-600">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-1">
                  {item.title !== "Total Referrals" && (
                    <IndianRupee size={22} />
                  )}
                  <p className="text-2xl">{item.value}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 ">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            {/* Recent Referrals */}
            <div className="lg:col-span-3">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Recent Referrals
              </h3>
              <Card className="mt-8 p-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <div className="grid py-4 px-4 grid-cols-3 font-semibold text-purple-100 bg-purple-500 lg:px-8">
                      <div>Name</div>
                      <div className="text-right">Referral Code</div>
                      <div className="text-right">Status</div>
                    </div>

                    {/* If no recent referral codes available */}
                    {data?.latestReferrals.length === 0 && (
                      <div className="h-24 w-full flex justify-center items-center">
                        There are no latest referral update for you! 😔
                      </div>
                    )}

                    <div className="px-4 py-4 flex flex-col space-y-4 lg:px-6">
                      {data?.latestReferrals.map((referral, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 items-center text-sm"
                        >
                          <div className="flex gap-3 items-center">
                            <div className="hidden justify-center items-center size-9 rounded-full text-fuchsia-950 bg-fuchsia-100 border border-fuchsia-400 lg:flex">
                              A
                            </div>
                            <div>Adesh Singh</div>
                          </div>
                          <div className="text-right">
                            {referral.referralCode}
                          </div>
                          <div className="flex justify-end">
                            <div
                              className={`flex items-center gap-2 py-1 px-2 text-right rounded-lg ${
                                referral.status === "used"
                                  ? "bg-green-200"
                                  : referral.status === "pending"
                                  ? "bg-yellow-200"
                                  : "bg-red-200"
                              }`}
                            >
                              {referral.status === "approved" ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : referral.status === "pending" ? (
                                <Clock className="w-4 h-4" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                              <p className="hidden lg:block">
                                {referral.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active referral to share */}
            <div className="lg:col-span-2">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Available Referral to share
              </h3>
              <Card className="mt-8 p-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <div className="grid py-4 px-8 grid-cols-3 font-semibold text-white bg-purple-500">
                      <div>Referral Code</div>
                      <div className="text-right">Copy</div>
                      <div className="text-right">Share</div>
                    </div>

                    {/* If no active referrals */}
                    {data?.active.length === 0 && (
                      <div className="h-24 w-full flex justify-center items-center">
                        There are no referral code for you! 😔
                      </div>
                    )}

                    <div className="px-3 pt-2 pb-4 flex flex-col space-y-4">
                      {data?.active.map((referral, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 items-center text-sm"
                        >
                          <div>{referral.referralCode}</div>
                          <div className="flex justify-end">
                            <Copy
                              className="cursor-pointer text-purple-500 hover:text-purple-800"
                              size={18}
                              onClick={() => {
                                copy(referral.referralCode);
                                toast("Copied to clipboard");
                              }}
                            />
                          </div>
                          <div className="flex justify-end">
                            <RWebShare
                              data={{
                                text: "Divyam Referral Code",
                                url: "https://divyam.com",
                                title: "Divyam Pvt Ltd",
                              }}
                              onClick={() =>
                                console.log("shared successfully!")
                              }
                            >
                              <Share
                                size={18}
                                className="cursor-pointer text-purple-500 hover:text-purple-800"
                              />
                            </RWebShare>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
