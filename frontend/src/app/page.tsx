import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import SignIn from "./auth/signin/page";
export const metadata: Metadata = {
  title:
    "Admin Dokter Ikan",
  description: "Login Admin Dokter Ikan",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout> */}
        <SignIn />
      {/* </DefaultLayout> */}
    </>
  );
}
