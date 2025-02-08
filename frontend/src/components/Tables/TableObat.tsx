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
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9001/medicines");
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
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus obat ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:9001/medicines/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data obat");
      }

      const updatedMedicines = medicines.filter((medicine) => medicine.medicine_id !== id);
      setMedicines(updatedMedicines);
      setFilteredMedicines(updatedMedicines);
    } catch (error) {
      console.error("Error deleting medicine:", error);
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
                      onClick={() => handleDelete(medicine.medicine_id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMedicines.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Tidak ada data yang ditemukan.
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

export default TableObat;
