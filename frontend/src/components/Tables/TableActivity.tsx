'use client';

import React, { useEffect, useState } from "react";
import { Activity } from "@/types/activity";

const TableActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [fishExperts, setFishExperts] = useState<any[]>([]);
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<number | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<any | null>(null);
  const [selectedConsultationId, setSelectedConsultationId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchActivities();
    fetchFishExperts();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:9001/consultations");
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

  const fetchFishExperts = async () => {
    try {
      const response = await fetch("http://localhost:9001/fishexperts");
      const data = await response.json();
      setFishExperts(data);
    } catch (error) {
      console.error("Error fetching fish experts:", error);
    }
  };

  const handleExpertClick = (index: number, consultation_id: number) => {
    setSelectedConsultationId(consultation_id);
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  const handleExpertSelection = (expert: any) => {
    if (!expert || typeof expert.fishExperts_id === "undefined") {
      console.error("Error: Expert selection is invalid. Expert data:", expert);
      return;
    }
    setSelectedExpert(expert);
    setVisibleDropdownIndex(null);
  };

  const closePopup = async () => {
    if (selectedExpert && selectedConsultationId !== null) {
      try {
        console.log(`Updating consultation with ID: ${selectedConsultationId}`);
        console.log(`Selected expert ID: ${selectedExpert.fishExperts_id}`);

        const response = await fetch(
          `http://localhost:9001/consultations/${selectedConsultationId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fishExpert_id: selectedExpert.fishExperts_id,
            }),
          }
        );

        if (response.ok) {
          console.log("Consultation updated successfully");
          await fetchActivities();
          setSelectedExpert(null);
        } else {
          console.error("Error updating consultation:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating consultation:", error);
      }
    }
  };

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
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
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activityItem, key) => (
                <tr key={key}>
                  <td className="border-b px-4 py-5 xl:pl-11">{activityItem.name}</td>
                  <td className="border-b px-4 py-5">{activityItem.email}</td>
                  <td className="border-b px-4 py-5">{activityItem.topic}</td>
                  <td
                    className="border-b px-4 py-5 cursor-pointer relative"
                    onClick={() => handleExpertClick(key, activityItem.consultation_id)}
                  >
                    {activityItem.tenagaAhli}
                    {visibleDropdownIndex === key && (
                      <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 max-h-60 overflow-y-auto border border-gray-200 z-10">
                        <ul>
                          {fishExperts.map((expert) => (
                            <li
                              key={expert.id}
                              className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                              onClick={() => handleExpertSelection(expert)}
                            >
                              {expert.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                  <td className="border-b px-4 py-5">
                    <span className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      activityItem.status === "Pending"
                        ? "bg-warning text-warning"
                        : activityItem.status === "Selesai"
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
                <td colSpan={5} className="text-center py-5">User yang dicari tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableActivity;
