import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = null) => {
  return NextResponse.json({
    success,
    message,
    data,
  }, {status : statusCode});
};

export const catchError = (error) => {
  console.error("Backend Error:", error);
  let statusCode = 500;
  let message = "Internal Server Error";
  // MongoDB Duplicate Key Error
  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyPattern)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  }

  const errorObj = {
    success: false,
    message: process.env.NODE_ENV === "development" ? error.message : message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  return NextResponse.json(errorObj, { status: statusCode });
};
