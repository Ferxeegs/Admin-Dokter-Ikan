"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishType } from "@/types/fish";

const EditSpesiesPage = ({ params }: { params: { id: string } }) => {
  const [fish, setFish] = useState<FishType | null>(null);
  const [formData, setFormData] = useState<FishType | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { id } = params;

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (id) {
      const fetchFishDetail = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/fish-types/${id}`);
          const fishData: FishType = await response.json();
          setFish(fishData);
          setFormData(fishData);
          setPreviewImage(fishData.image); // Tampilkan gambar yang sudah ada
        } catch (error) {
          console.error("Error fetching fish detail:", error);
        }
      };
      fetchFishDetail();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle perubahan gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Simpan file gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Tampilkan preview gambar baru
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!formData?.name || !formData?.description || !formData?.habitat) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/fish-types/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data spesies ikan.");
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

  if (!fish) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Spesies Ikan" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Spesies Ikan</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama Ikan</label>
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Deskripsi</label>
            <textarea
              name="description"
              value={formData?.description || ""}
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
              value={formData?.habitat || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* Input Gambar */}
          <div>
          <div>
            <label className="block text-gray-700">Gambar</label>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Pilih Gambar
            </button>
            {previewImage && <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded-lg border" />}
          </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Memperbarui..." : "Update Spesies Ikan"}
          </button>
        </form>
      </div>

      {success && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          Spesies Ikan berhasil diperbarui!
        </div>
      )}

      <div className="max-w-xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => router.push(`/spesiesikan`)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default EditSpesiesPage;
