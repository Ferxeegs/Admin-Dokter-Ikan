import { Metadata } from "next";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "Admin Dokter Ikan",
  description: "Login Admin Dokter Ikan",
};

export default async function Home() {
  return <SignIn />;
}
