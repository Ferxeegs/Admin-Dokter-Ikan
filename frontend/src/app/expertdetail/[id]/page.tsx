"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishExpert } from "@/types/fishexpert";

const FishExpertDetailPage = ({ params }: { params: { id: string } }) => {
  const [expert, setExpert] = useState<FishExpert | null>(null);
  const router = useRouter();
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

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Fish Expert</h2>

        <div>
          <p><strong>Nama:</strong> {expert.name}</p>
          <p><strong>Email:</strong> {expert.email}</p>
          <p><strong>Phone:</strong> {expert.phone_number}</p>
          <p><strong>Spesialisasi:</strong> {expert.specialization}</p>
          <p><strong>Pengalaman:</strong> {expert.experience}</p>
          <p><strong>Role:</strong> {expert.role}</p>
        </div>

        {/* Tombol Kembali di kanan bawah */}
        <button
          onClick={() => router.push("/akun")}
          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default FishExpertDetailPage;
