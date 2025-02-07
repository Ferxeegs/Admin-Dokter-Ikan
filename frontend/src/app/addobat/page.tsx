"use client";

import { useState, useEffect } from "react";
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
  });
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:9001/vendors");
        if (!response.ok) {
          throw new Error("Gagal mengambil data vendor");
        }
        const data = await response.json();
        setVendors(data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data vendor.");
      }
    };
    fetchVendors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.medicine_name || !formData.contain || !formData.dosage || !formData.price || !formData.vendor_id) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:9001/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, price: Number(formData.price), vendor_id: Number(formData.vendor_id) }),
      });
      
      if (!response.ok) {
        throw new Error("Gagal menambahkan obat.");
      }
      router.push("/obat");
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tambah Obat" />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Obat</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="medicine_name" value={formData.medicine_name} onChange={handleChange} placeholder="Nama Obat" className="w-full p-2 border rounded" required />
          <input type="text" name="contain" value={formData.contain} onChange={handleChange} placeholder="Kandungan" className="w-full p-2 border rounded" required />
          <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} placeholder="Dosis" className="w-full p-2 border rounded" required />
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Harga" className="w-full p-2 border rounded" required />
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stok" className="w-full p-2 border rounded" required />
          <select name="vendor_id" value={formData.vendor_id} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Pilih Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.vendor_id} value={vendor.vendor_id}>{vendor.vendor_name}</option>
            ))}
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
            {loading ? "Menambahkan..." : "Tambah Obat"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddObat;
