"use client";

import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableAkun from "@/components/Tables/TableAkun";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Akun = () => {
  const router = useRouter();

  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabel Akun" />

      <div className="flex justify-end mt-5 space-x-4 mb-4">
        <button
          onClick={() => router.push("/adduser")}
          className="bg-blue-500 text-white rounded-2xl px-6 py-2 font-medium hover:bg-opacity-90"
        >
          Tambah User
        </button>

        <button
          onClick={() => router.push("/addexpert")}
          className="bg-green-500 text-white rounded-2xl px-6 py-2 font-medium hover:bg-opacity-90"
        >
          Tambah Expert
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <TableAkun />
      </div>
    </DefaultLayout>
  );
};

export default Akun;
