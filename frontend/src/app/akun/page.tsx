import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableAkun from "@/components/Tables/TableAkun";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Akun = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabel User" />

      <div className="flex flex-col gap-10">
        <TableAkun />
      </div>
      <div className="flex justify-end mt-5">
        <button
          className="flex justify-center bg-blue-500 rounded-2xl px-6 py-2 font-medium text-gray hover:bg-opacity-90"
          type="submit"
        >
          Tambah User
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Akun;