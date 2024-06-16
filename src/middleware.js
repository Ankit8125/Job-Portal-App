// import { authMiddleware } from "@clerk/nextjs/server";

// export default authMiddleware({
//     publicRoutes: ["/"]
// });

/* 
Previously = clerkMiddleware
The primary change from the previous authMiddleware() is that clerkMiddleware() does not 
protect any routes by default, instead requiring the developer to add routes they would 
like to be protected by auth. This is a substantial contrast to the previous authMiddleware(), 
which protected all routes by default, requiring the developer to add exceptions.
*/

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect()
  }
});
// Now if I try to go to any other route other than '/', it will not get loaded* . This is the use of above middleware
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

