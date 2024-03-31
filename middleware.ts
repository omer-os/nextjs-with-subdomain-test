import { NextRequest, NextResponse } from "next/server";
import { restaurants } from "./restaurants";

export function middleware(req: NextRequest) {
  const { pathname, host } = req.nextUrl;

  // Determine if we're running locally
  const isLocal = host.startsWith("localhost");

  // Find if the pathname matches any restaurant's subdomain
  const restaurant = restaurants.find((r) =>
    pathname.includes(`/${r.subdomain}`)
  );

  // If a matching restaurant is found, construct and return the destination URL
  if (restaurant) {
    const destinationUrl = isLocal
      ? `http://${restaurant.subdomain}.lvh.me:3000`
      : `https://${restaurant.subdomain}.omarchatin.com`;

    return NextResponse.redirect(destinationUrl);
  }

  // If no matching restaurant is found, redirect to the /notfound page
  const notFoundUrl = isLocal
    ? `http://lvh.me:3000/notfound`
    : `https://omarchatin.com/notfound`;
  return NextResponse.redirect(notFoundUrl);
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
