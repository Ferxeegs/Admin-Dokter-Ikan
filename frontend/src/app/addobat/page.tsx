"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Vendor } from "@/types/vendor";

const AddObat = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    medicine_name: "",
    contain: "",
    dosage: "",
    price: "",
    stock: "",
    vendor_id: "",
    medicine_image: ""
  });
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); // Menyimpan URL gambar yang diupload
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // Fetch vendors data when component mounts
    const fetchVendors = async () => {
      const response = await fetch(`${API_BASE_URL}/vendors`);
      const data = await response.json();
      setVendors(data);
    };

    fetchVendors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!formData.medicine_name || !formData.contain || !formData.dosage || !formData.price || !formData.vendor_id || !imageUrl) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/medicines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price), vendor_id: Number(formData.vendor_id), medicine_image: imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan obat.");
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
      <Breadcrumb pageName="Tambah Obat" />

      <div className="relative max-w-xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Obat</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nama Obat</label>
              <input type="text" name="medicine_name" value={formData.medicine_name} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Kandungan</label>
              <input type="text" name="contain" value={formData.contain} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Dosis</label>
              <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Harga</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Stok</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-gray-700">Pilih Vendor</label>
              <select name="vendor_id" value={formData.vendor_id} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">Pilih Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.vendor_id} value={vendor.vendor_id}>{vendor.vendor_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Gambar Obat</label>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-[#5abce0] transition text-sm font-semibold w-full md:w-auto border-2 border-[#69CBF4] flex items-center justify-center space-x-2" onClick={handleButtonClick} type="button">
                <span>Pilih Gambar</span>
              </button>
              {imageUrl && (
                <img src={imageUrl.startsWith("http") ? imageUrl : `${API_BASE_URL}${imageUrl}`} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200" disabled={loading}>
              {loading ? "Menambahkan..." : "Tambah Obat"}
            </button>
          </form>
        </div>

        {success && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
            Obat berhasil ditambahkan!
          </div>
        )}

        <button onClick={() => router.push("/obat")} className="absolute -bottom-16 right-0 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200">
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default AddObat;
