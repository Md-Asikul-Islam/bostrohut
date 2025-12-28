"use client";

import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/assets/images/logo.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodSchema } from "@/lib/schema/auth.schema.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = zodSchema.pick({ email: true }).extend({
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      // API call here
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
                Login Into Account
              </h1>
              <p className="mt-2 text-lg text-muted-foreground md:text-xl">
                Login into your account by filling out the form below
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLoginSubmit)}
                className="space-y-6"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px]">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                          className="focus-visible:ring-2 focus-visible:ring-purple-500"
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
                          className="pr-10 focus-visible:ring-2 focus-visible:ring-purple-500"
                        />
                      </FormControl>

                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>

                      <div className="min-h-5">
                        {" "}
                        <FormMessage />{" "}
                      </div>
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="flex items-center justify-between text-[16px]">
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
                  text="Login"
                  className="w-full bg-purple-500 text-lg hover:bg-purple-600 transition-colors"
                />

                {/* Footer */}
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Don&apos;t have an account?
                  </span>
                  <Link
                    href="/auth/register"
                    className="text-purple-500 hover:underline"
                  >
                    Create Account
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

export default LoginPage;
