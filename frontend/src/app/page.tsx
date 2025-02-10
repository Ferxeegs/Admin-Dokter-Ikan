import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/[...nextauth]/route";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "Admin Dokter Ikan",
  description: "Login Admin Dokter Ikan",
};

export default async function Home() {
  // Mengambil session dari server
  const session = await getServerSession(authOptions);
  return <SignIn />;
}
