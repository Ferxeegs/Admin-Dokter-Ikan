"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishExpert } from "@/types/fishexpert";
import Image from "next/image";

const FishExpertDetailPage = () => {
  const [expert, setExpert] = useState<FishExpert | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchExpertDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fishexperts/${id}`);
        const expertData: FishExpert = await response.json();
        setExpert(expertData);
      } catch (error) {
        console.error("Error fetching expert detail:", error);
      }
    };

    if (id) {
      fetchExpertDetail();
    }
  }, [id, API_BASE_URL]);

  if (!expert) {
    return <div className="text-gray-500 text-center">Memuat data...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Fish Expert" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Fish Expert</h2>

        <div>
          <p><strong>Nama:</strong> {expert.name}</p>
          <p><strong>Email:</strong> {expert.email}</p>
          <p><strong>Nomor Telepon:</strong> {expert.phone_number}</p>
          <p><strong>Spesialisasi:</strong> {expert.specialization}</p>
          <p><strong>Pengalaman:</strong> {expert.experience}</p>
          <p><strong>Role:</strong> {expert.role}</p>
          <div className="mt-4 flex justify-center">
            {expert.image_url ? (
              <Image
                src={expert.image_url}
                alt={expert.name}
                width={600}
                height={300}
                className="rounded-lg object-cover w-full max-h-[300px] border"
              />
            ) : (
              <div className="w-full max-h-[300px] flex items-center justify-center bg-gray-200 rounded-lg">
                <p className="text-gray-500">Tidak ada gambar</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Kembali di luar Card */}
      <div className="max-w-xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => router.push("/akun")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default FishExpertDetailPage;