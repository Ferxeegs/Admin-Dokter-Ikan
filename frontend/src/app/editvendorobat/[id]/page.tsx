"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Vendor } from "@/types/vendor";

const EditVendorObatPage = ({ params }: { params: { id: string } }) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchVendorDetail = async () => {
        try {
          const response = await fetch(`http://localhost:9001/vendors/${id}`);
          const vendorData: Vendor = await response.json();
          setVendor(vendorData);
          setFormData(vendorData);
        } catch (error) {
          console.error("Error fetching vendor detail:", error);
        }
      };
      fetchVendorDetail();
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

    if (!formData?.vendor_name || !formData?.vendor_address || !formData?.contact) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:9001/vendors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data vendor obat.");
      }

      router.push(`/vendorobat`);
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Vendor Obat" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Vendor Obat</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama Vendor</label>
            <input
              type="text"
              name="vendor_name"
              value={formData?.vendor_name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Alamat</label>
            <textarea
              name="vendor_address"
              value={formData?.vendor_address || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Kontak</label>
            <input
              type="text"
              name="contact"
              value={formData?.contact || ""}
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
            {loading ? "Memperbarui..." : "Perbarui Vendor Obat"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditVendorObatPage;
