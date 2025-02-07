"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishType } from "@/types/fish";

const SpesiesIkanDetailPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [fish, setFish] = useState<FishType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFishDetail = async () => {
      try {
        const response = await fetch(`http://localhost:9001/fish-types/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data ikan");

        const fishData: FishType = await response.json();
        setFish(fishData);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFishDetail();
  }, [id]);

  if (loading) return <div className="text-gray-500 text-center">Memuat data...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Spesies Ikan" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Spesies Ikan</h2>

        {fish ? (
          <div>
            <p><strong>Nama:</strong> {fish.name}</p>
            <p><strong>Deskripsi:</strong> {fish.description}</p>
            <p><strong>Habitat:</strong> {fish.habitat}</p>
            {fish.image && (
              <img
                src={fish.image}
                alt={fish.name}
                className="mt-4 rounded w-full h-auto"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500">Data tidak ditemukan.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SpesiesIkanDetailPage;
