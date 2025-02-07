"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Vendor } from "@/types/vendor";

const TableVendor = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9001/vendors");
        if (!response.ok) {
          throw new Error("Gagal mengambil data vendor");
        }
        const data = await response.json();
        setVendors(data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data vendor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus vendor ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:9001/vendors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data vendor");
      }

      setVendors(vendors.filter((vendor) => vendor.vendor_id !== id));
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Daftar Vendor</h2>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-600">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">Nama Vendor</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Alamat</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Kontak</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.vendor_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{vendor.vendor_name}</td>
                  <td className="px-4 py-2">{vendor.vendor_address}</td>
                  <td className="px-4 py-2">{vendor.contact}</td>
                  <td className="px-4 py-2">
                    <button
                      className="ml-4 text-blue-500"
                      onClick={() => router.push(`/editvendorobat/${vendor.vendor_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-4 text-red-500"
                      onClick={() => handleDelete(vendor.vendor_id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableVendor;
