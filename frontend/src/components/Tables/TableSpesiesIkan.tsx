"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FishType } from "@/types/fish";

const TableSpesiesIkan = () => {
  const [fishTypes, setFishTypes] = useState<FishType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFishId, setSelectedFishId] = useState<number | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fish-types`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        const data = await response.json();
        setFishTypes(data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedFishId) return;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`${API_BASE_URL}/fish-types/${selectedFishId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }
      setPopupMessage("Spesies Ikan berhasil dihapus!");
      setTimeout(() => setPopupMessage(""), 2000);
      setFishTypes(fishTypes.filter((fish) => fish.fish_type_id !== selectedFishId));
    } catch (error) {
      console.error("Error deleting fish type:", error);
    } finally {
      setShowModal(false);
      setSelectedFishId(null);
    }
  };

  // Filter berdasarkan input pencarian
  const filteredFishTypes = fishTypes.filter((fish) =>
    fish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {popupMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          <p className="text-lg font-semibold">{popupMessage}</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        {/* Input pencarian */}
        <input
          type="text"
          placeholder="Cari spesies ikan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className="px-4 py-4 font-medium text-black dark:text-white">Nama Ikan</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Deskripsi</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Habitat</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFishTypes.length > 0 ? (
                filteredFishTypes.map((fish) => (
                  <tr key={fish.fish_type_id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{fish.name}</td>
                    <td className="px-4 py-2">{fish.description}</td>
                    <td className="px-4 py-2">{fish.habitat}</td>
                    <td className="border-b px-4 py-5">
                      <button
                        className="ml-4 text-blue-500"
                        onClick={() => router.push(`/editspesiesikan/${fish.fish_type_id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="ml-4 text-green-500"
                        onClick={() => router.push(`/spesiesikandetail/${fish.fish_type_id}`)}
                      >
                        Detail
                      </button>
                      <button
                        className="ml-4 text-red-500"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedFishId(fish.fish_type_id);
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-600">
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
            <p className="mb-4">Apakah Anda yakin ingin menghapus spesies ini?</p>
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

export default TableSpesiesIkan;
