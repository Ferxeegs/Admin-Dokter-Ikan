"use client";

import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { FishType } from "@/types/fish";

const TableSpesiesIkan = () => {
  const [fishTypes, setFishTypes] = useState<FishType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9001/fish-types");
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

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus spesies ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:9001/fish-types/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }

      setFishTypes(fishTypes.filter((fish) => fish.fish_type_id !== id));
    } catch (error) {
      console.error("Error deleting fish type:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Daftar Spesies Ikan</h2>
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
              {fishTypes.map((fish) => (
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
                      onClick={() => handleDelete(fish.fish_type_id)}
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

export default TableSpesiesIkan;
