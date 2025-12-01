import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/api/payment/success", "/api/payment/fail", "/api/payment/cancel", "/api/payment/ipn"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)(/|$)", "/(api|trpc)(.*)"],
};
