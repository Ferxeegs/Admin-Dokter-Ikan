"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

const AddExpert = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    specialization: "",
    experience: "",
    email: "",
    password: "",
    image_url: "",
    role: "expert",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); 
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.password || !formData.phone_number || !formData.specialization || !formData.experience) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/fishexperts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, image_url: imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan expert.");
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/akun");
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
  
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
  
    try {
      const response = await fetch(`${API_BASE_URL}/uploadcloudexpert`, {
        method: "POST",
        body: formData, // Jangan tentukan 'Content-Type' karena FormData akan melakukannya otomatis
      });
  
      const result = await response.json();
      console.log("Hasil unggahan gambar:", result);
  
      if (response.ok) {
        setImageUrl(result.images[0].url); // Menggunakan URL gambar dari Cloudinary
      } else {
        alert("Upload gagal: " + result.message);
      }
    } catch (error) {
      console.error("Error saat mengupload:", error);
      alert("Terjadi kesalahan saat mengupload.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Expert" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Expert</h2>

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
            <label className="block text-gray-700">Nomor Telepon</label>
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
            <textarea
              name="experience"
              value={formData.experience}
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
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Photo Profile Expert</label>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-[#5abce0] transition text-sm font-semibold w-full md:w-auto border-2 border-[#69CBF4] flex items-center justify-center space-x-2" onClick={handleButtonClick} type="button">
              <span>Pilih Gambar</span>
            </button>
            {imageUrl && (
              <Image
                src={imageUrl.startsWith("http") ? imageUrl : `${API_BASE_URL}${imageUrl}`} // Pastikan gambar berasal dari API_BASE_URL
                alt="Preview"
                width={128}
                height={128}
                className="mt-2 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Menambahkan..." : "Tambah Expert"}
          </button>
        </form>
      </div>
      {success && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          Expert berhasil ditambahkan!
        </div>
      )}

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

export default AddExpert;