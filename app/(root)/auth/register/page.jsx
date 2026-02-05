"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zodSchema } from "@/lib/schema/auth.schema.js";
import { Card, CardContent } from "@/components/ui/card";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/aplications/ButtonLoading";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import apiInstance from "@/lib/axios";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const formSchema = zodSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string().min(8, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const handleRegisterSubmit = async (values) => {
    setLoading(true);
    const toastId = toast.loading("Creating your account..."); 

    try {
      const { data } = await apiInstance.post("/auth/register", values);

      toast.success(data.message, { id: toastId });
      form.reset();
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 sm:p-8">
            {/* Logo */}
            <div className="flex justify-center">
              <Image src={Logo} alt="Logo" className="h-auto w-36" priority />
            </div>

            {/* Heading */}
            <div className="py-6 text-center">
              <h1 className="text-2xl font-semibold sm:text-3xl text-gradient-primary">
                Create Account
              </h1>
              <p className="mt-2 text-lg text-muted-foreground md:text-xl">
                create new account by filling out the form below
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleRegisterSubmit)}
                className=""
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="name"
                          placeholder="Enter Your Name "
                          {...field}
                          autoComplete="name"
                          className={` focus-visible:ring-purple-500 transition-colors ${
                            field.value ? "bg-[#E8F0FE]" : ""
                          }`}
                        />
                      </FormControl>
                      <div className="min-h-5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                          className=" focus-visible:ring-purple-500 "
                        />
                      </FormControl>
                      <div className="min-h-5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className={` focus-visible:ring-purple-500 transition-colors ${
                            field.value ? "bg-[#E8F0FE]" : ""
                          }`}
                        />
                      </FormControl>

                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-8.5 text-muted-foreground hover:text-foreground transition"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>

                      <div className="min-h-5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel> Confrim Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter your confirm password"
                          {...field}
                          className={` focus-visible:ring-purple-500 transition-colors ${
                            field.value ? "bg-[#E8F0FE]" : ""
                          }`}
                        />
                      </FormControl>

                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-8.5 text-muted-foreground hover:text-foreground transition"
                      >
                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>

                      <div className="min-h-5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                {/* Actions */}
                <div className="flex items-center justify-between text-[16px] space-y-3">
                  <div className="space-x-2 flex items-center">
                    <input type="checkbox" />
                    <span className="text-muted-foreground ">Remember me</span>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="text-purple-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Register"
                  className="w-full bg-purple-500 text-lg hover:bg-purple-600 transition-colors"
                />

                {/* Footer */}
                <div className="text-[16px] text-center  space-x-2 mt-3">
                  <span className="text-muted-foreground">
                    Already have an account?
                  </span>
                  <Link
                    href="/auth/login"
                    className="text-purple-500 hover:underline"
                  >
                    login
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
