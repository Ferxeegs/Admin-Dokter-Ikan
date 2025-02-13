"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableObat from "@/components/Tables/TableObat";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Obat = () => {
  const router = useRouter();
  const [totalObat, setTotalObat] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      try {
        const response = await fetch(`${API_BASE_URL}/medicines`);
        const data = await response.json();
        setTotalObat(data.length);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Obat" />

      <div className="flex justify-between mt-5 mb-4">
        <span className="bg-gray-200 text-black rounded-2xl px-6 py-2 font-medium">
          Total Obat: {totalObat}
        </span>
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
