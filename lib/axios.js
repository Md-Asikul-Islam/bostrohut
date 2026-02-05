import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // এটি অত্যন্ত গুরুত্বপূর্ণ, এটি কুকি আদান-প্রদান নিশ্চিত করে
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor: গ্লোবাল এরর হ্যান্ডলিংয়ের জন্য
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি সার্ভার থেকে 401 (Unauthorized) আসে, তার মানে সেশন শেষ
    if (error.response?.status === 401) {
      // ক্লায়েন্ট সাইডে হলে লগইন পেজে রিডাইরেক্ট করা যেতে পারে
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;