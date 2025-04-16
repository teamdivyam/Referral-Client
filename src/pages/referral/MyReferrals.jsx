import { Separator } from "@/components/ui/separator";
import { useAxiosGet } from "../../hooks/useAxios";
import agentService from "../../services/agent.service";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import ActiveReferral from "../../components/table/activeReferral";
import UsedReferral from "../../components/table/usedReferral";
import PendingReferral from "../../components/table/pendingReferral";
import LatestReferral from "../../components/table/latestReferral";

/**
 * TODO
 * - Write API query for referrals
 * - Add pagination
 * - Add search
 * - Add filters
 */

const LIMIT = 20;

export default function MyReferrals() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("latest");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log(page, status);
    const fetchData = async () => {
      if (!loading) setLoading(true);

      try {
        const response = await agentService.getAgentReferrals({page, referralStatusCode: status});
        setData(response.data.agent);
        setTotalPages(Math.ceil(response.data.total / LIMIT));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, status]);

  const handleStatusChange = (value) => {
    if (value === status) return;
    setLoading(true);
    setStatus(value);
    setPage(1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8">
      <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 lg:text-2xl">
        My Referrals
      </h2>

      <Separator className="my-4" />

      <div className="flex items-center justify-between mt-8 my-4">
        <h3 className="my-4 scroll-m-20 text-lg font-semibold tracking-tight">
          {status.toUpperCase()}
        </h3>
        <Select onValueChange={(value) => handleStatusChange(value)}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem defaultValue value="latest">
                Latest
              </SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="used">Used</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {status === "latest" && <LatestReferral data={data} loading={loading} />}
      {status === "active" && <ActiveReferral data={data} loading={loading} />}
      {status === "pending" && (
        <PendingReferral data={data} loading={loading} />
      )}
      {status === "used" && <UsedReferral data={data} loading={loading} />}

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
