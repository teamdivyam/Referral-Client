import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import LoadingSpinner from "../loading-spinner";

export default function ActiveReferral({ data, loading }) {
  return (
    <Table className="border">
      <TableHeader className="bg-purple-500">
        <TableRow>
          <TableHead className="text-white">Code</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Created At</TableHead>
          <TableHead className="text-white text-right">Reward Amount</TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data?.referral?.active?.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No Active Referrals Found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableBody>
            {data?.referral.active.map((referral, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {referral.referralCode}
                </TableCell>
                <TableCell>{referral.status}</TableCell>
                <TableCell>
                  {moment(referral.createdAt).format("MMM Do YY")}
                </TableCell>
                <TableCell className="text-right">
                  {referral.rewardAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  );
}
