import connectDB from "@/lib/db";
import { catchError, response } from "@/lib/helperFuction";
import { zodSchema } from "@/lib/schema/auth.schema";
import { sendMail } from "@/lib/sendMail";
import UserModel from "@/models/user/User.model";
import { SignJWT } from "jose";
import { emailVerificationLink } from "@/email/emailVerificationLink";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();

    // Validation
    const validationSchema = zodSchema.pick({ name: true, email: true, password: true });
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 400, "Validation failed", validatedData.error.flatten().fieldErrors);
    }

    const { name, email, password } = validatedData.data;

    // Check existing user
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return response(false, 409, "Email is already registered");
    }

    // Create User
    const newUser = await UserModel.create({ name, email, password });

    // Generate JWT Token (Jose implementation fix)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: newUser._id })
      .setProtectedHeader({ alg: "HS256" }) 
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    // Send Mail
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
    await sendMail(
      "Verify your account",
      email,
      emailVerificationLink(verificationUrl)
    );

    return response(true, 201, "Registration successful! Please verify your email.");
  } catch (error) {
    return catchError(error); 
  }
}