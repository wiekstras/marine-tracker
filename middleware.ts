import NextAuth from "next-auth"

import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"
import {NextResponse} from "next/server";

export const { auth } = NextAuth(authConfig);

const API_KEY = process.env.API_KEY;

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isBoatEndpoint = nextUrl.pathname === '/boat';

    // Check for API key in headers
    const apiKey = req.headers.get('x-api-key');

    if (isBoatEndpoint) {
        if (req.method === 'POST') {
            if (apiKey && apiKey === API_KEY) {
                return NextResponse.next();
            } else {
                return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
            }
        } else if (req.method === 'GET') {
            return NextResponse.next();
        } else {
            return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
        }
    }
    if (isApiAuthRoute) {
        return NextResponse.next()
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }

        return NextResponse.next()
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};