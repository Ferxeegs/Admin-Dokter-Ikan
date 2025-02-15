"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


const AddSpesiesIkan = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    habitat: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validasi sederhana
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!formData.name || !formData.description || !formData.habitat) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/fish-types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan spesies ikan.");
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/spesiesikan");
      }, 2000);
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Spesies Ikan" />

      {/* Wrapper untuk Form dan Tombol Kembali */}
      <div className="relative max-w-xl mx-auto">
        {/* Form Tambah Spesies Ikan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Spesies Ikan</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nama Ikan</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Habitat</label>
              <input
                type="text"
                name="habitat"
                value={formData.habitat}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {success && (
              <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
                Spesies Ikan berhasil ditambahkan!
              </div>
            )}
            {/* Field Gambar (Opsional) */}
            <div>
            <label className="block text-gray-700">Gambar</label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleChange}
            />
            <button
              className="bg-white text-[#69CBF4] px-6 py-2 rounded-lg hover:bg-[#f0f0f0] transition text-sm font-semibold w-full md:w-auto border-2 border-[#69CBF4] flex items-center justify-center space-x-2"
              onClick={handleButtonClick}
              type="button"
            >
              <img src="/images/icon/ic_file.png" alt="File" className="w-4 h-4" />
              <span>Pilih File</span>
            </button>

        </div>
            {/* Tombol Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Menambahkan..." : "Tambah Spesies Ikan"}
            </button>
          </form>
        </div>

        {/* Tombol Kembali di Kanan Bawah dan di Luar Card */}
        <button
          onClick={() => router.push("/spesiesikan")}
          className="absolute -bottom-16 right-0 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default AddSpesiesIkan;
