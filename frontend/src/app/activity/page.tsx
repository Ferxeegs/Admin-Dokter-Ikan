import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableActivity from "@/components/Tables/TableActivity";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Activity = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Konsultasi" />

      <div className="flex flex-col gap-10">
        <TableActivity />
      </div>
    </DefaultLayout>
  );
};

export default Activity;