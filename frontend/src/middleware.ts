import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Ambil token dari cookie

  // Jika tidak ada token, redirect ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Lanjutkan ke halaman yang diminta
}

// Tentukan halaman yang perlu autentikasi
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Sesuaikan path yang perlu auth
};
