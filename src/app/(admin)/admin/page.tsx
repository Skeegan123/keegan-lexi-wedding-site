import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getDashboardStats } from "@/db/queries/select";

export default async function AdminDashboard() {
  const { totalGuests, rsvpdYes, rsvpdNo, pendingRsvp } = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <Heading title="Dashboard" description="Overview of your RSVP system" />
        <Separator className="my-6" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RSVP&apos;d Yes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rsvpdYes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RSVP&apos;d No</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rsvpdNo}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending RSVP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRsvp}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
