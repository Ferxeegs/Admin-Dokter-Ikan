"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

const AddSpesiesIkan = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    other_name: "",
    latin_name: "",
    description: "",
    habitat: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); // Menyimpan URL gambar yang diupload
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.description || !formData.habitat || !imageUrl) {
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
        body: JSON.stringify({ ...formData, image: imageUrl }),
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
  
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
  
    try {
      const response = await fetch(`${API_BASE_URL}/uploadcloudfish`, {
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
      <Breadcrumb pageName="Tambah Spesies Ikan" />

      <div className="relative max-w-xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Spesies Ikan</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nama Ikan</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Nama Lain Ikan</label>
              <input type="text" name="other_name" value={formData.other_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Nama Latin Ikan</label>
              <input type="text" name="latin_name" value={formData.latin_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Deskripsi</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Habitat</label>
              <input type="text" name="habitat" value={formData.habitat} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Gambar Ikan</label>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-[#5abce0] transition text-sm font-semibold w-full md:w-auto border-2 border-[#69CBF4] flex items-center justify-center space-x-2" onClick={handleButtonClick} type="button">
                <span>Pilih Gambar</span>
              </button>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="mt-2 object-cover rounded"
                />
              )}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200" disabled={loading}>
              {loading ? "Menambahkan..." : "Tambah Spesies Ikan"}
            </button>
          </form>
        </div>
            {success && (
              <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
                Spesies Ikan berhasil ditambahkan!
              </div>
            )}

        <button onClick={() => router.push("/spesiesikan")} className="absolute -bottom-16 right-0 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200">
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default AddSpesiesIkan;