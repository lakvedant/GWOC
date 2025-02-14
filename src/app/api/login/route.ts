import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Ensure you have this secret set

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to the database

    const { phone, name, email } = await req.json(); // Get user details from the request body

    if (!phone || !name || !email) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    }

    // Create new user
    const user = new User({ phone, name, email });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, phone: user.phone }, 
      JWT_SECRET, 
      { expiresIn: '7d' } // Token expires in 1 hour
    );

    return NextResponse.json({ token, message: 'User created successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
