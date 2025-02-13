"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableVendor from "@/components/Tables/TableVendor";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const VendorObat = () => {
  const router = useRouter();
  const [totalVendor, setTotalVendor] = useState(0);

  useEffect(() => {
    const fetchVendors = async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      try {
        const response = await fetch(`${API_BASE_URL}/vendors`);
        const data = await response.json();
        setTotalVendor(data.length);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Vendor Obat" />

      <div className="flex justify-between mt-5 mb-4">
        <span className="bg-gray-200 text-black rounded-2xl px-6 py-2 font-medium">
          Total Vendor: {totalVendor}
        </span>
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
