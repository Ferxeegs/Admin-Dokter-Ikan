"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import TableRevenue from "@/components/Tables/TableRevenue";
import ChartTwo from "@/components/Charts/ChartTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalExperts, setTotalExperts] = useState<number>(0);
  const [totalConsultations, setTotalConsultations] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (url: string, setData: (value: number) => void) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        setData(data.length);
      } catch (error) {
        console.error(`Error fetching ${url}:`, error);
      }
    };

    fetchData("http://localhost:9001/users", setTotalUsers);
    fetchData("http://localhost:9001/fishexperts", setTotalExperts);
    fetchData("http://localhost:9001/consultations", setTotalConsultations);
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Users" total={totalUsers}>
          <Image width={22} height={12} src={"/images/icon/total-users.svg"} alt="Total Users" />
        </CardDataStats>

        <CardDataStats title="Total Experts" total={totalExperts}>
          <Image width={22} height={12} src={"/images/icon/total-expert.svg"} alt="Total Experts" />
        </CardDataStats>

        <CardDataStats title="Total Consultations" total={totalConsultations}>
          <Image width={22} height={12} src={"/images/icon/total-views.svg"} alt="Total Consultations" />
        </CardDataStats>
      </div>

      {/* Tabel dan Grafik */}
      <p className="text-lg font-bold text-black mt-5">Transaksi Terbaru</p>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TableRevenue />
        </div>
        <ChartTwo />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
