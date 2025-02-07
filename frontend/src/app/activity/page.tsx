import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableActivity from "@/components/Tables/TableActivity";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Daftar Konsultasi",
  description:
    "Daftar Konsultasi",
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