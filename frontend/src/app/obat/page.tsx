"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableObat from "@/components/Tables/TableObat";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Obat = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tabel Obat" />

      <div className="flex justify-end mt-5 space-x-4 mb-4">
        <button
          onClick={() => router.push("/addobat")}
          className="bg-blue-500 text-white rounded-2xl px-6 py-2 font-medium hover:bg-opacity-90"
        >
          Tambah Obat
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <TableObat />
      </div>
    </DefaultLayout>
  );
};

export default Obat;
