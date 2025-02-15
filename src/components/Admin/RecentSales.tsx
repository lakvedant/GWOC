import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { User2 } from "lucide-react";

async function getData() {
    await connectDB();
  
    const data = await Order.find()
      .select({
        amount: 1,
        id: 1,
        user: 1,
      })
      .populate({
        path: "userId",
        select: "name phone",
      })
      .sort({
        createdAt: -1,
      })
      .limit(7)
      .exec();
  
    //   console.log(data);
    return data;
  }

export async function RecentSales() {
  const data = await getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item: any) => (
          <div className="flex items-center gap-4" key={item.id}>
            {/* <Avatar className="hidden sm:flex h-9 w-9">
              <AvatarImage src={item.User?.profileImage} alt="Avatar Image" />
              <AvatarFallback>
                {item.User?.firstName.slice(0, 3)}
              </AvatarFallback>
            </Avatar> */}
            <User2 className="h-9 w-9" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">{item.userId?.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.userId?.phone}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +₹{new Intl.NumberFormat("en-IN").format(item.amount)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}