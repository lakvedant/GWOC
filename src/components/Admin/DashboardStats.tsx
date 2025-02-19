import connectDB from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  IndianRupee, 
  PartyPopper, 
  ShoppingBag, 
  User2, 
  TrendingUp,
  Clock,
  Wallet,
  CreditCard
} from "lucide-react";

import { WeeklyChart } from './WeeklyChart'; // We'll create this next
import { PaymentChart } from './PaymentChart';

interface UserType {
	_id: string;
	createdAt: string;
  }
  
  interface ProductType {
	_id: string;
	price: number;
  }
  
  interface OrderType {
	userId: string;
	phone: string;
	products: { productId: string; quantity: number }[]; 
	amount: number;
	paymentType: "UPI" | "COD";
	createdAt: string;
  } 


  async function getData(): Promise<{
	users: UserType[];
	products: ProductType[];
	orders: OrderType[];
  }> {
	await connectDB();
  
	const [users, products, orders] = await Promise.all([
	  User.find({}, { _id: 1, createdAt: 1 }).lean<UserType[]>(),
	  Product.find({}, { _id: 1, price: 1 }).lean<ProductType[]>(),
	  Order.find({}, {
		userId: 1,
		phone: 1,
		products: 1,
		amount: 1,
		paymentType: 1,
		createdAt: 1
	  }).sort({ createdAt: -1 }).lean<OrderType[]>(),
	]);
  
	return { users, products, orders };
  }  
  
  export async function DashboardStats() {
	const data = await getData();
	const { products, users, orders } = data;
  
	const totalAmount = orders.reduce((acc, curr) => acc + curr.amount, 0);
  
	const upiOrders = orders.filter(order => order.paymentType === "UPI");
	const codOrders = orders.filter(order => order.paymentType === "COD");
	const upiAmount = upiOrders.reduce((acc, curr) => acc + curr.amount, 0);
	const codAmount = codOrders.reduce((acc, curr) => acc + curr.amount, 0);
  
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayOrders = orders.filter(order =>
	  new Date(order.createdAt).getTime() >= today.getTime()
	);
	const todayAmount = todayOrders.reduce((acc, curr) => acc + curr.amount, 0);
  
	type ChartDataType = { date: string; orders: number; amount: number };
  
	const last7Days: ChartDataType[] = [...Array(7)].map((_, i) => {
	  const date = new Date();
	  date.setDate(date.getDate() - i);
	  date.setHours(0, 0, 0, 0);
	  const nextDate = new Date(date);
	  nextDate.setDate(nextDate.getDate() + 1);
  
	  const dayOrders = orders.filter(order =>
		new Date(order.createdAt) >= date &&
		new Date(order.createdAt) < nextDate
	  );
  
	  return {
		date: date.toLocaleDateString("en-US", { weekday: "short" }),
		orders: dayOrders.length,
		amount: dayOrders.reduce((acc, curr) => acc + curr.amount, 0),
	  };
	}).reverse();
  
	type PaymentChartDataType = { name: string; value: number; count: number };
  
	const paymentData: PaymentChartDataType[] = [
	  { name: "UPI", value: upiAmount, count: upiOrders.length },
	  { name: "COD", value: codAmount, count: codOrders.length },
	];
  
	return (
	  <div className="space-y-8">
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>Total Revenue</CardTitle>
			  <IndianRupee className="h-4 w-4 text-green-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-4xl font-bold">
				₹{new Intl.NumberFormat("en-IN").format(totalAmount)}
			  </p>
			  <p className="text-xs text-muted-foreground">Lifetime earnings</p>
			</CardContent>
		  </Card>
  
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>Today&apos;s Revenue</CardTitle>
			  <TrendingUp className="h-4 w-4 text-blue-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-4xl font-bold">
				₹{new Intl.NumberFormat("en-IN").format(todayAmount)}
			  </p>
			  <p className="text-xs text-muted-foreground">
				{todayOrders.length} orders today
			  </p>
			</CardContent>
		  </Card>
  
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>UPI Payments</CardTitle>
			  <Wallet className="h-4 w-4 text-purple-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-4xl font-bold">
				₹{new Intl.NumberFormat("en-IN").format(upiAmount)}
			  </p>
			  <p className="text-xs text-muted-foreground">
				{upiOrders.length} UPI orders
			  </p>
			</CardContent>
		  </Card>
  
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>COD Payments</CardTitle>
			  <CreditCard className="h-4 w-4 text-orange-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-4xl font-bold">
				₹{new Intl.NumberFormat("en-IN").format(codAmount)}
			  </p>
			  <p className="text-xs text-muted-foreground">
				{codOrders.length} COD orders
			  </p>
			</CardContent>
		  </Card>
		</div>
  
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>Total Orders</CardTitle>
			  <ShoppingBag className="h-4 w-4 text-blue-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-2xl font-bold">{orders.length}</p>
			  <p className="text-xs text-muted-foreground">
				Lifetime orders
			  </p>
			</CardContent>
		  </Card>
  
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>Products</CardTitle>
			  <PartyPopper className="h-4 w-4 text-indigo-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-2xl font-bold">{products.length}</p>
			  <p className="text-xs text-muted-foreground">
				Active products
			  </p>
			</CardContent>
		  </Card>
  
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>Users</CardTitle>
			  <User2 className="h-4 w-4 text-green-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-2xl font-bold">{users.length}</p>
			  <p className="text-xs text-muted-foreground">
				Registered users
			  </p>
			</CardContent>
		  </Card>
  
		  <Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
			  <CardTitle>Avg. Order Value</CardTitle>
			  <Clock className="h-4 w-4 text-red-500" />
			</CardHeader>
			<CardContent>
			  <p className="text-2xl font-bold">
				₹{new Intl.NumberFormat("en-IN").format(totalAmount / orders.length || 0)}
			  </p>
			  <p className="text-xs text-muted-foreground">
				Per order average
			  </p>
			</CardContent>
		  </Card>
		</div>
  
		<div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <WeeklyChart data={last7Days} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PaymentChart data={paymentData} />
            </div>
          </CardContent>
        </Card>
      </div>
	  </div>
	);
  }
