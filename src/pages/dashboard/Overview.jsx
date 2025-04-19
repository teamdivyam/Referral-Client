import useAuth from "../../hooks/useAuth";
import {
  CheckCircle,
  Copy,
  Share,
  Clock,
  XCircle,
  IndianRupee,
  ChartNoAxesCombined,
  ReceiptIndianRupee,
} from "lucide-react";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";
import Loading from "@/components/loading";

import copy from "copy-to-clipboard";

import { Link } from "react-router-dom";
import agentService from "../../services/agent.service";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SummaryCard from "../../components/cards/SummaryCard";

export default function Overview() {
  const { user } = useAuth();
  const [loading, setLoading] = useState();
  const [activeReferrals, setActiveReferrals] = useState([]);
  const [latestReferrals, setLatestReferrals] = useState([]);

  useEffect(() => {
    const fetchLatestReferralData = async () => {
      setLoading(true);
      try {
        const response = await agentService.getAgentReferrals({
          page: 1,
          limit: 10,
          referralStatusCode: "latest",
        });

        setLatestReferrals(response.data.agent.referral.latest);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestReferralData();
  }, []);

  useEffect(() => {
    const fetchActiveReferralData = async () => {
      try {
        setLoading(true);

        const response = await agentService.getAgentReferrals({
          page: 1,
          limit: 8,
          referralStatusCode: "active",
        });

        setActiveReferrals(response.data.agent.referral.active);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveReferralData();
  }, []);

  const summary = [
    {
      title: "Total Earnings",
      value: user.totalEarningAmount,
      icon: <ChartNoAxesCombined size={28} color="red" />,
    },
    {
      title: "Pending Withdrawal",
      value: user.pendingWithdrawalAmount,
      icon: <ReceiptIndianRupee size={28} color="green" />,
    },
    {
      title: "Balance",
      value: user.balance,
      icon: <IndianRupee size={28} color="blue" />,
    },
    {
      title: "Pending Balance",
      value: user.pendingBalance,
      icon: <ChartNoAxesCombined size={28} color="brown" />,
    },
  ];

  if (loading) {
    return <Loading />;
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
        <h2 className="scroll-m-20 text-3xl text-slate-800 font-semibold tracking-tight first:mt-0">
          {/* <span className="text-blue-500">{getGreetingTime()}!</span>{" "}
          {user.name} */}
          Welcome Back
        </h2>

        {/* Summary */}
        <div className="grid gap-4 grid-cols-1 mt-6 rounded-md sm:grid-cols-2 lg:bg-white lg:border lg:grid-cols-4">
          <SummaryCard
            title={summary[0].title}
            value={summary[0].value}
            icon={summary[0].icon}
            className="bg-red-100"
          />
          <SummaryCard
            title={summary[1].title}
            value={summary[1].value}
            icon={summary[1].icon}
            className="bg-green-100"
          />
          <SummaryCard
            title={summary[2].title}
            value={summary[2].value}
            icon={summary[2].icon}
            className="bg-violet-100"
          />
          <SummaryCard
            title={summary[3].title}
            value={summary[3].value}
            icon={summary[3].icon}
            className="bg-yellow-100"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Recent Referrals */}
          <div className="px-4 py-3 bg-white border rounded-md lg:col-span-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-800">
                Recent Referrals
              </h2>
              <Link
                to="/referral/my-referrals"
                className="text-slate-400 text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Code</TableHead>
                  <TableHead className="text-right text-gray-400">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestReferrals.map((referral, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-800 font-medium">
                      Ankur Tiwari
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {referral.referralCode}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <div
                        className={`flex gap-1.5 items-center px-2.5 py-1 rounded-md text-gray-700 ${
                          referral.status === "used"
                            ? "bg-green-200"
                            : referral.status === "pending"
                            ? "bg-yellow-200"
                            : "bg-red-200"
                        }`}
                      >
                        {referral.status === "used" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : referral.status === "pending" ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        <span className="text-sm">{referral.status}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 py-3 bg-white border rounded-md lg:col-span-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-800">
                Active Referrals
              </h2>
              <Link
                to="/referral/my-referrals"
                className="text-slate-400 text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Code</TableHead>
                  <TableHead className="text-right text-gray-400">
                    Copy
                  </TableHead>
                  <TableHead className="text-right text-gray-400">
                    Share
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeReferrals.map((referral, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-800 font-medium">
                      {referral.referralCode}
                    </TableCell>
                    <TableCell className="text-gray-700">
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
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <RWebShare
                        data={{
                          text: "Divyam Referral Code",
                          url: "https://divyam.com",
                          title: "Divyam Pvt Ltd",
                        }}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <Share
                          size={18}
                          className="cursor-pointer text-purple-500 hover:text-purple-800"
                        />
                      </RWebShare>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Active referral to share */}
          {/* <div className="lg:col-span-2">
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

                    {activeReferrals?.length === 0 && (
                      <div className="h-24 w-full flex justify-center items-center">
                        There are no referral code for you! 😔
                      </div>
                    )}

                    <div className="px-3 pt-2 pb-4 flex flex-col space-y-4">
                      {activeReferrals?.map((referral, index) => (
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
            </div> */}
        </div>
      </div>
    </div>
  );
}
