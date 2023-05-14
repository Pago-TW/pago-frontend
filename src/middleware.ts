export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/orders/:orderId/shoppers", "/trips/:path*", "/users/me/:path*"],
};
