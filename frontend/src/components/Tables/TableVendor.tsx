"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Vendor } from "@/types/vendor";

const TableVendor = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
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
        setFilteredVendors(data);
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
      setPopupMessage("Vendor berhasil dihapus!");
        setTimeout(() => setPopupMessage(""), 2000);
      const updatedVendors = vendors.filter((vendor) => vendor.vendor_id !== id);
      setVendors(updatedVendors);
      setFilteredVendors(updatedVendors);
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = vendors.filter((vendor) =>
      vendor.vendor_name.toLowerCase().includes(value)
    );
    setFilteredVendors(filtered);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {popupMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          <p className="text-lg font-semibold">{popupMessage}</p>
        </div>
      )}
      <div className="flex justify-between mb-4">
        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Cari nama vendor..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
              {filteredVendors.map((vendor) => (
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
              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                   Data tidak dapat ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableVendor;
