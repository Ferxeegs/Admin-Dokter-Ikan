"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableVendor from "@/components/Tables/TableVendor";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const VendorObat = () => {
  const router = useRouter();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Vendor Obat" />

      <div className="flex justify-end mt-5 space-x-4 mb-4">
        <button
          onClick={() => router.push("/addvendorobat")}
          className="bg-blue-500 text-white rounded-2xl px-6 py-2 font-medium hover:bg-opacity-90"
        >
          Tambah Vendor
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <TableVendor />
      </div>
    </DefaultLayout>
  );
};

export default VendorObat;
