import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Product from '@/models/Product';
import Order from '@/models/Order';

async function getData() {
  await dbConnect();

  const [user, products, order] = await Promise.all([
    User.find({}, { _id: 1 }).lean(),
    Product.find({}, { _id: 1 }).lean(),
    Order.find({}, { amount: 1 }).lean(),
  ]);

  return {
    user,
    products,
    order,
  };
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data', error });
  }
}