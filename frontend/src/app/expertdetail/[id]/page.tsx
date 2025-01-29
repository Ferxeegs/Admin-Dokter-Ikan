"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishExpert } from "@/types/fishexpert";

const FishExpertDetailPage = ({ params }: { params: { id: string } }) => {
  const [expert, setExpert] = useState<FishExpert | null>(null);
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchExpertDetail = async () => {
        try {
          const response = await fetch(`http://localhost:9001/fishexperts/${id}`);
          const expertData: FishExpert = await response.json();
          setExpert(expertData);
        } catch (error) {
          console.error("Error fetching expert detail:", error);
        }
      };
      fetchExpertDetail();
    }
  }, [id]);

  if (!expert) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Fish Expert" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Fish Expert</h2>

        <div>
          <p><strong>Nama:</strong> {expert.name}</p>
          <p><strong>Email:</strong> {expert.email}</p>
          <p><strong>Phone:</strong> {expert.phone_number}</p>
          <p><strong>Spesialisasi:</strong> {expert.specialization}</p>
          <p><strong>Pengalaman:</strong> {expert.experience}</p>
          <p><strong>Role:</strong> {expert.role}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FishExpertDetailPage;
