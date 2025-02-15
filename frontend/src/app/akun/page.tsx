"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableAkun from "@/components/Tables/TableAkun";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Akun = () => {
  const router = useRouter();
  const [totalAkun, setTotalAkun] = useState(0);

  useEffect(() => {
    const fetchTotalAkun = async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      try {
        const [usersRes, expertsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/users`),
          fetch(`${API_BASE_URL}/fishexperts`),
        ]);

        const users = await usersRes.json();
        const experts = await expertsRes.json();

        setTotalAkun(users.length + experts.length);
        console.log("Fetching from:", `${API_BASE_URL}/users`, `${API_BASE_URL}/fishexperts`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchTotalAkun();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Akun" />

      <div className="flex justify-between mt-5 mb-4">
        <span className="bg-gray-200 text-black rounded-2xl px-6 py-2 font-medium">
          Total Akun: {totalAkun}
        </span>
        <div className="flex space-x-4">
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
      </div>

      <div className="flex flex-col gap-10">
        <TableAkun />
      </div>
    </DefaultLayout>
  );
};

export default Akun;
