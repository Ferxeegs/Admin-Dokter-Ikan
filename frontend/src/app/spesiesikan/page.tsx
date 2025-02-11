"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableSpesiesIkan from "@/components/Tables/TableSpesiesIkan";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SpesiesIkan = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Spesies Ikan" />

      <div className="flex justify-end mt-5 space-x-4 mb-4">
        <button
          onClick={() => router.push("/addspesiesikan")}
          className="bg-blue-500 text-white rounded-2xl px-6 py-2 font-medium hover:bg-opacity-90"
        >
          Tambah Ikan
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <TableSpesiesIkan />
      </div>
    </DefaultLayout>
  );
};

export default SpesiesIkan;
