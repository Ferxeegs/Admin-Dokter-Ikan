"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Medicine } from "@/types/medicine";

const TableObat = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/medicines`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data obat");
        }
        const data = await response.json();
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data obat.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const handleDelete = async () => {
    if (!selectedMedicine) return;
    try {
      const response = await fetch(`${API_BASE_URL}/medicines/${selectedMedicine.medicine_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data obat");
      }
      setPopupMessage("Obat berhasil dihapus!");
      setTimeout(() => setPopupMessage(""), 2000);
      const updatedMedicines = medicines.filter(
        (medicine) => medicine.medicine_id !== selectedMedicine.medicine_id
      );
      setMedicines(updatedMedicines);
      setFilteredMedicines(updatedMedicines);
    } catch (error) {
      console.error("Error deleting medicine:", error);
    } finally {
      setShowModal(false);
      setSelectedMedicine(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = medicines.filter((medicine) =>
      medicine.medicine_name.toLowerCase().includes(value)
    );
    setFilteredMedicines(filtered);
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
          placeholder="Cari nama obat..."
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
                <th className="px-4 py-4 font-medium text-black dark:text-white">Nama Obat</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Kandungan</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Dosis</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Harga</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Stok</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.medicine_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{medicine.medicine_name}</td>
                  <td className="px-4 py-2">{medicine.contain}</td>
                  <td className="px-4 py-2">{medicine.dosage}</td>
                  <td className="px-4 py-2">Rp {medicine.price.toLocaleString()}</td>
                  <td className="px-4 py-2">{medicine.stock.toLocaleString()}</td>
                  <td className="border-b px-4 py-5">
                    <button
                      className="ml-4 text-blue-500"
                      onClick={() => router.push(`/editobat/${medicine.medicine_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-4 text-green-500"
                      onClick={() => router.push(`/obatdetail/${medicine.medicine_id}`)}
                    >
                      Detail
                    </button>                   
                    <button 
                        className="ml-4 text-red-500" 
                        onClick={() => { setSelectedMedicine(medicine); setShowModal(true); }}>
                        Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMedicines.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Data tidak dapat ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-96 text-center">
              <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
              <p className="mb-4">Apakah Anda yakin ingin menghapus obat ini?</p>
              <div className="flex justify-center gap-4">
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Hapus</button>
                <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default TableObat;