import { DashboardStats } from "@/components/Admin/DashboardStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Order from "@/models/Order";
import connectDB from "@/lib/db";
import { Chart } from "@/components/Admin/Chart";
import { RecentSales } from "@/components/Admin/RecentSales";

interface OrderData {
  amount: number;
  createdAt: Date;
}

async function getData() {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  await connectDB();

  const data: OrderData[] = await Order
    .find({
      createdAt: {
        $gte: thirtyDaysAgo,
      },
    })
    .select({
      amount: 1,
      createdAt: 1,
    })
    .sort({
      createdAt: 1,
    })
    .exec();

  const result = data.map((item: OrderData) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount,
  }));

  return result;
}

export default async function Dashboard() {
  const data = await getData();
  return (
    <div className="p-5">
      <DashboardStats />

      <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-5">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        <RecentSales />
      </div>
    </div>
  );
}