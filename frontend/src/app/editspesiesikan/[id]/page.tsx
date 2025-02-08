"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FishType } from "@/types/fish";

const EditSpesiesPage = ({ params }: { params: { id: string } }) => {
  const [fish, setFish] = useState<FishType | null>(null);
  const [formData, setFormData] = useState<FishType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchFishDetail = async () => {
        try {
          const response = await fetch(`http://localhost:9001/fish-types/${id}`);
          const fishData: FishType = await response.json();
          setFish(fishData);
          setFormData(fishData);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData?.name || !formData?.description || !formData?.habitat) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:9001/fish-types/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data spesies ikan.");
      }

      // Jika sukses, kembali ke halaman detail spesies ikan
      router.push(`/spesiesikan`);
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Memperbarui..." : "Update Spesies Ikan"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditSpesiesPage;
