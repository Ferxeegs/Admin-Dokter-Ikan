"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishExpert } from "@/types/fishexpert";
import Image from "next/image";

const FishExpertEditPage = () => {
  const [expert, setExpert] = useState<FishExpert | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    specialization: "",
    experience: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [imageUrl, setImageUrl] = useState<string>(""); // Menyimpan URL gambar yang diupload
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchExpertDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fishexperts/${id}`);
        const data = await response.json();
        setFormData({
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          specialization: data.specialization,
          experience: data.experience,
          image_url: data.image_url,
        });
        setImageUrl(data.image_url);
      } catch (error) {
        console.error("Error fetching expert detail:", error);
      }
    };
    if (id) {
      fetchExpertDetail();
    }
  }, [id, API_BASE_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    if (!formData.name || !formData.email || !formData.phone_number || !formData.specialization || !formData.experience) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    let body: any = { ...formData };

    if (imageUrl && imageUrl.startsWith("/uploads")) {
      body.image_url = imageUrl;  // Menggunakan gambar baru
    }
    
    console.log("Data yang akan dikirim ke server:", body);
    
    try {
      const response = await fetch(`${API_BASE_URL}/fishexperts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Gagal mengupdate data.");
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/akun");
      }, 2000);
    } catch (error) {
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("files", file);
  
    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,  // Jangan tentukan 'Content-Type' karena FormData akan melakukannya otomatis
      });
  
      const result = await response.json();
      console.log("Hasil unggahan gambar:", result);
  
      if (response.ok) {
        setImageUrl(result.filePath); // Menggunakan path relatif
      } else {
        alert("Upload gagal: " + result.message);
      }
    } catch (error) {
      console.error("Error saat mengupload:", error);
      alert("Terjadi kesalahan saat mengupload.");
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Fish Expert" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Fish Expert</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama</label>
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
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Spesialisasi</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Pengalaman</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Photo Profile Expert</label>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-[#5abce0] transition text-sm font-semibold w-full md:w-auto border-2 border-[#69CBF4] flex items-center justify-center space-x-2"
              onClick={handleButtonClick}
              type="button"
            >
              <span>Pilih Gambar</span>
            </button>
            {imageUrl && (
              <Image
                src={`${API_BASE_URL}${imageUrl}`}
                alt="Preview"
                width={128}
                height={128}
                className="mt-2 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Mengupdate..." : "Update Expert"}
          </button>
        </form>
      </div>
      {success && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          Expert berhasil diperbarui!
        </div>
      )}
      {/* Tombol Kembali di luar Card */}
      <div className="max-w-xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => router.push(`/akun`)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default FishExpertEditPage;