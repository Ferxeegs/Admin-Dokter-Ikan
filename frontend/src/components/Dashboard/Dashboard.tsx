"use client";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import ChartTwo from "../Charts/ChartTwo";
import Image from "next/image";

const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalExperts, setTotalExperts] = useState<number>(0);
  const [totalConsultations, setTotalConsultations] = useState<number>(0);

  useEffect(() => {
    // Fetch total users
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:9001/users");
        if (!response.ok) throw new Error("Gagal mengambil data pengguna");
        const data = await response.json();
        setTotalUsers(data.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch total experts
    const fetchExperts = async () => {
      try {
        const response = await fetch("http://localhost:9001/fishexperts");
        if (!response.ok) throw new Error("Gagal mengambil data ahli ikan");
        const data = await response.json();
        setTotalExperts(data.length);
      } catch (error) {
        console.error("Error fetching fish experts:", error);
      }
    };

    // Fetch total consultations
    const fetchConsultations = async () => {
      try {
        const response = await fetch("http://localhost:9001/consultations");
        if (!response.ok) throw new Error("Gagal mengambil data konsultasi");
        const data = await response.json();
        setTotalConsultations(data.length);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchUsers();
    fetchExperts();
    fetchConsultations();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Users" total={totalUsers}>
          <Image
            width={22}
            height={12}
            src={"/images/icon/total-users.svg"}
            alt="Total Users"
          />
        </CardDataStats>

        <CardDataStats title="Total Experts" total={totalExperts}>
          <Image
            width={22}
            height={12}
            src={"/images/icon/total-expert.svg"}
            alt="Total Experts"
          />
        </CardDataStats>

        <CardDataStats title="Total Consultations" total={totalConsultations}>
          <Image
            width={22}
            height={12}
            src={"/images/icon/total-views.svg"}
            alt="Total Consultations"
          />
        </CardDataStats>
      </div>

      <p className="text-lg font-bold text-black mt-5">Transaksi terbaru</p>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          
        </div>
        <ChartTwo />
      </div>
    </>
  );
};

export default Dashboard;
