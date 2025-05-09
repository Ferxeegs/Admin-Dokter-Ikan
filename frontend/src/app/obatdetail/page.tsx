"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Medicine } from "@/types/medicine";
import { Vendor } from "@/types/vendor";
import Image from "next/image";

const ObatDetailPage = () => {
  const searchParams = useSearchParams(); // Ambil ID dari URL
  const id = searchParams.get("id");
  const router = useRouter(); // Hook untuk navigasi
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  // const [vendorName, setVendorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchMedicineDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/medicines/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data obat");

        const medicineData: Medicine = await response.json();
        setMedicine(medicineData);

        // Ambil data vendor berdasarkan vendor_id
        // const vendorResponse = await fetch(`${API_BASE_URL}/vendors`);
        // if (!vendorResponse.ok) throw new Error("Gagal mengambil data vendor");

        // const vendors: Vendor[] = await vendorResponse.json();
        // const vendor = vendors.find((v) => v.vendor_id === medicineData.vendor_id);
        // setVendorName(vendor ? vendor.vendor_name : "Tidak ditemukan");
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMedicineDetail();
  }, [id, API_BASE_URL]);

  if (loading) return <div className="text-gray-500 text-center">Memuat data...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Obat" />

      {/* Wrapper untuk form dan tombol kembali */}
      <div className="relative max-w-xl mx-auto">
        {/* Card Detail */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Obat</h2>

          {medicine ? (
            <div>
              <p><strong>Nama:</strong> {medicine.medicine_name}</p>
              <p><strong>Kandungan:</strong> {medicine.contain}</p>
              <p><strong>Dosis:</strong> {medicine.dosage}</p>
              <p><strong>Harga:</strong> Rp {medicine.price.toLocaleString()}</p>
              <p><strong>Stok:</strong> {medicine.stock.toLocaleString()}</p>
              {/* <p><strong>Vendor:</strong> {vendorName}</p> */}
              <div className="mt-4 flex justify-center">
                {medicine.medicine_image ? (
                  <Image
                    src={medicine.medicine_image}
                    alt={medicine.medicine_image}
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

        {/* Tombol Kembali di kanan bawah dan di luar card */}
        <button
          onClick={() => router.push("/obat")}
          className="absolute -bottom-16 right-0 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ObatDetailPage;