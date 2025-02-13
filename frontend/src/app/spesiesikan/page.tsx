"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableSpesiesIkan from "@/components/Tables/TableSpesiesIkan";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SpesiesIkan = () => {
  const router = useRouter();
  const [totalFishTypes, setTotalFishTypes] = useState(0);

  useEffect(() => {
    fetchTotalFishTypes();
  }, []);

  const fetchTotalFishTypes = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const response = await fetch(`${API_BASE_URL}/fish-types`);
      const data = await response.json();
      setTotalFishTypes(data.length);
    } catch (error) {
      console.error("Error fetching fish types:", error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Spesies Ikan" />
        <div className="flex justify-between mt-5 mb-4">
        <span className="bg-gray-200 text-black rounded-2xl px-6 py-2 font-medium">
          Total Spesies Ikan : {totalFishTypes} ekor
        </span>
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