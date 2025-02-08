"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Medicine } from "@/types/medicine";
import { Vendor } from "@/types/vendor";

const ObatDetailPage = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const router = useRouter(); // Hook untuk navigasi
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [vendorName, setVendorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicineDetail = async () => {
      try {
        const response = await fetch(`http://localhost:9001/medicines/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data obat");

        const medicineData: Medicine = await response.json();
        setMedicine(medicineData);

        // Ambil data vendor berdasarkan vendor_id
        const vendorResponse = await fetch(`http://localhost:9001/vendors`);
        if (!vendorResponse.ok) throw new Error("Gagal mengambil data vendor");

        const vendors: Vendor[] = await vendorResponse.json();
        const vendor = vendors.find((v) => v.vendor_id === medicineData.vendor_id);
        setVendorName(vendor ? vendor.vendor_name : "Tidak ditemukan");
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMedicineDetail();
  }, [id]);

  if (loading) return <div className="text-gray-500 text-center">Memuat data...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Obat" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Obat</h2>

        {medicine ? (
          <div>
            <p><strong>Nama:</strong> {medicine.medicine_name}</p>
            <p><strong>Kandungan:</strong> {medicine.contain}</p>
            <p><strong>Dosis:</strong> {medicine.dosage}</p>
            <p><strong>Harga:</strong> Rp {medicine.price.toLocaleString()}</p>
            <p><strong>Stok:</strong> {medicine.stock.toLocaleString()}</p>
            <p><strong>Vendor:</strong> {vendorName}</p>
            {medicine.medicine_image && (
              <img
                src={medicine.medicine_image}
                alt={medicine.medicine_name}
                className="mt-4 rounded w-full h-auto"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-500">Data tidak ditemukan.</p>
        )}

        {/* Tombol Kembali */}
        <button
          onClick={() => router.push("/obat")}
          className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ObatDetailPage;
