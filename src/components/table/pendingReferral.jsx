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

export default function PendingReferral({ data, loading }) {
  return (
    <Table>
      <TableHeader className="bg-purple-500">
        <TableRow>
          <TableHead className="text-white">Code</TableHead>
          <TableHead className="text-white">Customer Name</TableHead>
          <TableHead className="text-white">Customer Phone No</TableHead>
          <TableHead className="text-white">Used Date</TableHead>
          <TableHead className="text-white">Balance Credit Date</TableHead>
          <TableHead className="text-white text-right">
            Pending Balance
          </TableHead>
        </TableRow>
      </TableHeader>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TableBody>
          {data?.referral.pending.map((referral, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {referral.referralCode}
              </TableCell>
              <TableCell>Ravi Gupta</TableCell>
              <TableCell>7894561338</TableCell>
              <TableCell>
                {moment(referral.createdAt).format("MMM Do YY")}
              </TableCell>
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
