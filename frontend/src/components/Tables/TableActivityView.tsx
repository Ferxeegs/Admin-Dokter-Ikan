'use client';

import React, { useEffect, useState } from "react";
import { Activity } from "@/types/activity";

const TableActivityView = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Maksimal 5 data per halaman

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const response = await fetch(`${API_BASE_URL}/consultations`);
      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        consultation_id: item.consultation_id,
        name: item.User?.name || "Nama tidak tersedia",
        email: item.User?.email || "Email tidak tersedia",
        topic: item.UserConsultation?.consultation_topic || "Topik tidak tersedia",
        tenagaAhli: item.FishExpert?.name || "Belum dipilih",
        status: item.consultation_status || "Status tidak tersedia",
      }));
      setActivities(formattedData);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  // Hitung jumlah halaman
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  // Dapatkan data yang sesuai dengan halaman saat ini
  const currentData = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Nama</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">Topik Konsultasi</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">Tenaga Ahli</th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((activityItem, key) => (
                <tr key={key}>
                  <td className="border-b px-4 py-5 xl:pl-11">{activityItem.name}</td>
                  <td className="border-b px-4 py-5">{activityItem.email}</td>
                  <td className="border-b px-4 py-5">{activityItem.topic}</td>
                  <td className="border-b px-4 py-5">{activityItem.tenagaAhli}</td>
                  <td className="border-b px-4 py-5">
                    <span className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      activityItem.status === "Waiting"
                        ? "bg-warning text-warning"
                        : activityItem.status === "In Consultation"
                        ? "bg-success text-success"
                        : "bg-danger text-danger"
                    }`}>
                      {activityItem.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-5">Tidak ada data konsultasi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
          >
            Prev
          </button>
          <span className="px-3 py-1 border rounded bg-gray-100">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TableActivityView;
