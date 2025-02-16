import { NextResponse } from "next/server";
import User, { IUser } from "@/models/User";
import connectDB from "@/lib/db";

export async function GET() {
    try {
        await connectDB();

        const users = await User.find({}).sort({
            createdAt: -1,
        }).lean();

        if (!users || users.length === 0) {
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(users, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch users", error}, {status: 500})
    }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body:IUser = await req.json();

    if (!body.name || !body.phone) {
        return NextResponse.json(
            {error: "Missing required fields"},
            {status: 400}
        )
    }

    const userData = {
      ...body,
  }

  const newUser = await User.create(userData);

    return NextResponse.json({ exists: !!newUser }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}