import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrder } from "@/models/Order";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";

async function getData() {
	await dbConnect();

	const [user, products, order] = await Promise.all([
		User.find({}, { _id: 1 }).lean(),
		Product.find({}, { _id: 1 }).lean(),
		Order.find({}, { userId: 1, phone: 1, products: 1, amount: 1 }),
	]);
	
	return {
		user,
		products,
		order,
	};
}

export async function DashboardStats() {
	const data = await getData();
	const { products, user, order } = data;

	const totalAmount = (order: IOrder[]): number => {
		return order.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.amount;
		}, 0);
	};

	return (
		<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Revenue</CardTitle>
					<DollarSign className="h-4 w-4 text-green-500" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">
						${new Intl.NumberFormat("en-US").format(totalAmount(order) / 100)}
					</p>
					<p className="text-xs text-muted-foreground">Any Message</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Sales</CardTitle>
					<ShoppingBag className="h-4 w-4 text-blue-500" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">+{order.length}</p>
					<p className="text-xs text-muted-foreground">
						Total Sales on Bindi's CupCakery
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Products</CardTitle>
					<PartyPopper className="h-4 w-4 text-indigo-500" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{products.length}</p>
					<p className="text-xs text-muted-foreground">
						Total Products created
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Users</CardTitle>
					<User2 className="h-4 w-4 text-orange-500" />
				</CardHeader>
				<CardContent>
					<p className="text-2xl font-bold">{user.length}</p>
					<p className="text-xs text-muted-foreground">Total Users Signed Up</p>
				</CardContent>
			</Card>
		</div>
	);
}
