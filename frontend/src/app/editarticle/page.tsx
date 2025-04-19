"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

const EditArticle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    category: "",
    description: "",
    url: "",
    urltoimage: "",
    contents: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(""); // Menyimpan URL gambar yang diupload
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // Ambil data artikel berdasarkan ID dari URL
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/article/${id}`);
        const data = await response.json();
        console.log("Data dari API:", data); // Tambahkan log ini
        setFormData({
          author: data.author,
          title: data.title,
          category: data.category,
          description: data.description,
          contents: data.contents,
          url: data.url,
          urltoimage: data.urltoimage,
        });
        setImageUrl(data.urltoimage); // Menampilkan gambar yang sudah ada
      } catch (err) {
        console.error("Error fetching article details:", err);
        setError("Gagal memuat data artikel.");
      }
    };
    if (id) {
      fetchArticleDetails();
    }
  }, [id, API_BASE_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.title || !formData.description || !formData.contents || !formData.url) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    const body = {
      ...formData,
     urltoimage: imageUrl || formData.urltoimage, // Gunakan imageUrl jika ada, atau gunakan nilai sebelumnya
    };
    console.log("Data yang akan dikirim ke server:", body);

    try {
      const response = await fetch(`${API_BASE_URL}/article/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui artikel.");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/article");
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
        const uploadedUrl = result.images[0].url;
        setImageUrl(uploadedUrl);
        setFormData((prev) => ({ ...prev, image_url: uploadedUrl }));

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
      <Breadcrumb pageName="Edit Artikel" />

      <div className="relative max-w-xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Artikel</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nama Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          
            <div>
              <label className="block text-gray-700">Judul Artikel</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Kategori</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
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
              <label className="block text-gray-700">Konten Artikel</label>
              <textarea
                name="contents"
                value={formData.contents}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">URL Artikel</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Gambar Artikel</label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-[#5abce0] transition text-sm font-semibold w-full md:w-auto border-2 border-[#69CBF4] flex items-center justify-center space-x-2"
                onClick={handleButtonClick}
                type="button"
              >
                <span>Pilih Gambar</span>
              </button>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="mt-2 object-cover rounded"
                  unoptimized={true}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Memperbarui..." : "Perbarui Artikel"}
            </button>
          </form>
        </div>

        {success && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
            Artikel berhasil diperbarui!
          </div>
        )}

        <button
          onClick={() => router.push("/article")}
          className="absolute -bottom-16 right-0 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default EditArticle;