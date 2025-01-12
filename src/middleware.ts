import { auth } from "./lib/auth.base";
import { ADMIN_ROLE } from "./service/enum/ADMIN_ROLE";

export default auth((req) => {
  const user = req.auth?.user;
  const isAdmin =
    user?.role === ADMIN_ROLE.ADMIN || user?.role === ADMIN_ROLE.SUPERADMIN;
  if (!isAdmin && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
