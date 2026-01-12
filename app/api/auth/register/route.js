import connectDB from "@/lib/db";
import { response } from "@/lib/helperFuction";
import { zodSchema } from "@/lib/schema/auth.schema";
import UserModel from "@/models/user/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
    try {
        await connectDB();
        //validation schema
        const validationSchema = zodSchema.pick({
            name : true, email : true, password : true,
        })
        const payload = await request.json();

        const validatedData = validationSchema.safeParse(payload);
        
        if(!validatedData.success) {
            return response(false, 401, "Invalid or missing field", validatedData.error)
        }

        const {name, email, password} = validatedData.data;

        const checkUser = await UserModel.exists({email});
        // check user already registered
        if(checkUser) {
            return response(true, 409, "User already registered", validatedData.error)
        }
        // new registration
        const NewRegistration = new UserModel({
            name, email, password
        })
        await NewRegistration.save()

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const token = await new SignJWT({userId: NewRegistration._id})
        .setIssuedAt()
        .setExpirationTime("1")
        setProtectedHeader({agl : "HS256"})
    } catch (error) {
        
    }
}