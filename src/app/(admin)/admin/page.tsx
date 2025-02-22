import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getDashboardStats } from "@/db/queries/select";
import PieChart from "@/components/charts/PieChart";

export default async function AdminDashboard() {
  const { totalGuests, rsvpdYes, rsvpdNo, pendingRsvp, plusOnesAllowed, plusOnesAdded } = await getDashboardStats();

  const rsvpPieData = {
    labels: ["RSVP'd Yes", "RSVP'd No", "Pending RSVP"],
    datasets: [
      {
        data: [rsvpdYes, rsvpdNo, pendingRsvp],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
        hoverBackgroundColor: ["#66BB6A", "#E57373", "#FFD54F"],
      },
    ],
  };

  const plusOnesRemaining = plusOnesAllowed - plusOnesAdded;

  const plusOnesPieData = {
    labels: ["Plus Ones Remaining", "Plus Ones Added"],
    datasets: [
      {
        data: [plusOnesRemaining, plusOnesAdded],
        backgroundColor: ["#2196F3", "#9C27B0"],
        hoverBackgroundColor: ["#64B5F6", "#BA68C8"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

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
      <div>
        <Heading title="Analytics" description="Charts representing RSVP and Plus Ones stats" />
        <Separator className="my-6" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>RSVP Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={rsvpPieData} options={chartOptions} />
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Plus Ones Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={plusOnesPieData} options={chartOptions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
