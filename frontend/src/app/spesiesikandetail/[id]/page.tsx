"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishType } from "@/types/fish";
import Image from "next/image";

const SpesiesIkanDetailPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const router = useRouter(); // Hook untuk navigasi
  const [fish, setFish] = useState<FishType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchFishDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fish-types/${id}`);
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
  }, [id, API_BASE_URL]);

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
            <p><strong>Nama Lain:</strong> {fish.other_name}</p>
            <p><strong>Nama Latin:</strong> <em>{fish.latin_name}</em></p>
            <p><strong>Deskripsi:</strong> {fish.description}</p>
            <p><strong>Habitat:</strong> {fish.habitat}</p>

            {/* Menampilkan gambar ikan */}
            <div className="mt-4 flex justify-center">
              {fish.image ? (
                <Image
                  src={`${API_BASE_URL}${fish.image}`}
                  alt={fish.name}
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
        ) : (
          <p className="text-gray-500">Data tidak ditemukan.</p>
        )}
      </div>

      {/* Tombol Kembali di luar Card */}
      <div className="max-w-xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => router.push("/spesiesikan")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default SpesiesIkanDetailPage;