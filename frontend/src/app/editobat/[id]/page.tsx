"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Medicine } from "@/types/medicine";

const EditObatPage = ({ params }: { params: { id: string } }) => {
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    medicine_name: "",
    contain: "",
    dosage: "",
    price: "",
    stock: "",
    medicine_image: "",
  });
  const [imageUrl, setImageUrl] = useState<string>(""); // Menyimpan URL gambar yang diupload
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchMedicineDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/medicines/${id}`);
        const data = await response.json();
        console.log("Data dari API:", data); // Tambahkan log ini
        setFormData({
          medicine_name: data.medicine_name,
          contain: data.contain,
          dosage: data.dosage,
          price: data.price,
          stock : data.stock,
          medicine_image: data.medicine_image,
        });
        setImageUrl(data.medicine_image); // Menampilkan gambar yang sudah ada
      } catch (err) {
        console.error("Error fetching fish details:", err);
        setError("Gagal memuat data spesies ikan.");
      }
    };
    fetchMedicineDetail();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!formData.medicine_name || !formData.contain || !formData.dosage || !formData.price || !formData.stock) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    // Jika gambar diubah, kirim gambar dengan form-data
    let body: any = { ...formData };

    if (imageUrl && imageUrl.startsWith("/uploads")) {
      body.medicine_image = imageUrl;  // Menggunakan gambar baru
    }
    
    console.log("Data yang akan dikirim ke server:", body);

    try {
      const response = await fetch(`${API_BASE_URL}/medicines/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Obat" />

      <div className="relative max-w-xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
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

            <div>
              <label className="block text-gray-700">Gambar</label>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-[#5abce0] transition text-sm font-semibold w-full md:w-auto border-2 border-[#69CBF4] flex items-center justify-center space-x-2"
                onClick={handleButtonClick}
                type="button"
              >
                <span>Pilih Gambar</span>
              </button>
              {imageUrl && (
                <img
                  src={`${API_BASE_URL}${imageUrl}`}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Memperbarui..." : "Perbarui Obat"}
            </button>
          </form>
        </div>

        {success && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
            Obat berhasil diperbarui!
          </div>
        )}

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

export default EditObatPage;
