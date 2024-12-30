import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Placeholder data
const rsvpData = [
  { id: 1, name: "John Doe", status: "Confirmed" },
  { id: 2, name: "Jane Smith", status: "Declined" },
  { id: 3, name: "Alice Johnson", status: "Pending" },
];

export default function RSVPStatusPage() {
  return (
    <div className="space-y-6">
      <Heading title="RSVP Status" description="View guest RSVP statuses" />
      <Separator className="my-6" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rsvpData.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell>{guest.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    guest.status === "Confirmed"
                      ? "default"
                      : guest.status === "Declined"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {guest.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

