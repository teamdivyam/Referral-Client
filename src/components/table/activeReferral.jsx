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
      <TableCaption>A list of your recent invoices.</TableCaption>
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
      )}
    </Table>
  );
}
