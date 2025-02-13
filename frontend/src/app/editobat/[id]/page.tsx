"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Medicine } from "@/types/medicine";

const EditObatPage = ({ params }: { params: { id: string } }) => {
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [formData, setFormData] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (id) {
      const fetchMedicineDetail = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/medicines/${id}`);
          const medicineData: Medicine = await response.json();
          setMedicine(medicineData);
          setFormData(medicineData);
        } catch (error) {
          console.error("Error fetching medicine detail:", error);
        }
      };
      fetchMedicineDetail();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!formData?.medicine_name || !formData?.contain || !formData?.dosage || !formData?.price) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/medicines/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data obat.");
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/obat");
      }, 2000);
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Obat" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Obat</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama Obat</label>
            <input
              type="text"
              name="medicine_name"
              value={formData?.medicine_name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Kandungan</label>
            <textarea
              name="contain"
              value={formData?.contain || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Dosis</label>
            <input
              type="text"
              name="dosage"
              value={formData?.dosage || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Harga</label>
            <input
              type="number"
              name="price"
              value={formData?.price || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData?.stock || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Memperbarui..." : "Update Obat"}
          </button>
        </form>
      </div>
      {success && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          Obat berhasil diperbarui!
        </div>
      )}
      {/* Tombol Kembali di luar Card */}
      <div className="max-w-xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => router.push(`/obat`)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default EditObatPage;
