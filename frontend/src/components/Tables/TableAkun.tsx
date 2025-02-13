"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Akun } from "@/types/akun";
import { FishExpert } from "@/types/fishexpert";

const TableAkun = () => {
  const [users, setUsers] = useState<Akun[]>([]);
  const [fishExperts, setFishExperts] = useState<FishExpert[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchExpert, setSearchExpert] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const itemsPerPage = 5;
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentPageExpert, setCurrentPageExpert] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
      const usersResponse = await fetch(`${API_BASE_URL}/users`);
      const usersData: Akun[] = await usersResponse.json();
      setUsers(usersData);

      const fishExpertsResponse = await fetch(`${API_BASE_URL}/fishexperts`);
      const fishExpertsData: FishExpert[] = await fishExpertsResponse.json();
      setFishExperts(fishExpertsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchUser.toLowerCase()));
  const filteredExperts = fishExperts.filter(expert => expert.name.toLowerCase().includes(searchExpert.toLowerCase()));

  const totalPagesUser = Math.ceil(filteredUsers.length / itemsPerPage);
  const totalPagesExpert = Math.ceil(filteredExperts.length / itemsPerPage);

  const currentUsers = filteredUsers.slice((currentPageUser - 1) * itemsPerPage, currentPageUser * itemsPerPage);
  const currentExperts = filteredExperts.slice((currentPageExpert - 1) * itemsPerPage, currentPageExpert * itemsPerPage);

  const handleDelete = async (id: number, type: "user" | "expert") => {
    const endpoint = type === "user" ? `users/${id}` : `fishexperts/${id}`;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    // Menampilkan layar konfirmasi
    const userConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (!userConfirmed) {
        router.push("/akun");
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Gagal menghapus data");
        }

        fetchData();
        setPopupMessage("Data berhasil dihapus!");
        setTimeout(() => setPopupMessage(""), 2000);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};


return (
  <div className="flex flex-col gap-10">
    {/* Tabel User */}
    {popupMessage && (
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg">
        <p className="text-lg font-semibold">{popupMessage}</p>
      </div>
    )}
    
    <div className="rounded-lg border border-stroke bg-white p-5 shadow-md">
      <h2 className="text-lg font-semibold text-black mb-4">Daftar User</h2>
      <input
        type="text"
        placeholder="Cari nama user..."
        className="w-full p-2 mb-4 border rounded"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-4 font-medium text-black">Nama</th>
              <th className="px-4 py-4 font-medium text-black">Email</th>
              <th className="px-4 py-4 font-medium text-black">Role</th>
              <th className="px-4 py-4 font-medium text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.filter(user => user.name.toLowerCase().includes(searchUser.toLowerCase())).map(user => (
              <tr key={user.user_id}>
                <td className="border-b px-4 py-5">{user.name}</td>
                <td className="border-b px-4 py-5">{user.email}</td>
                <td className="border-b px-4 py-5">{user.role}</td>
                <td className="border-b px-4 py-5">
                  <button className="text-blue-500" onClick={() => router.push(`/edituser/${user.user_id}`)}>Edit</button>
                  <button className="ml-4 text-green-500" onClick={() => router.push(`/userdetail/${user.user_id}`)}>Detail</button>
                  <button className="ml-4 text-red-500" onClick={() => handleDelete(user.user_id, "user")}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination User */}
        {totalPagesUser > 1 && (
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setCurrentPageUser(prev => Math.max(prev - 1, 1))}
              disabled={currentPageUser === 1}
              className={`px-3 py-1 border rounded ${currentPageUser === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
            >
              Prev
            </button>
            <span className="px-3 py-1 border rounded bg-gray-100">{currentPageUser} / {totalPagesUser}</span>
            <button
              onClick={() => setCurrentPageUser(prev => Math.min(prev + 1, totalPagesUser))}
              disabled={currentPageUser === totalPagesUser}
              className={`px-3 py-1 border rounded ${currentPageUser === totalPagesUser ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Tabel Expert */}
    <div className="rounded-lg border border-stroke bg-white p-5 shadow-md">
      <h2 className="text-lg font-semibold text-black mb-4">Daftar Expert</h2>
      <input
        type="text"
        placeholder="Cari nama expert..."
        className="w-full p-2 mb-4 border rounded"
        value={searchExpert}
        onChange={(e) => setSearchExpert(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-green-200 text-left">
              <th className="px-4 py-4 font-medium text-black">Nama</th>
              <th className="px-4 py-4 font-medium text-black">Email</th>
              <th className="px-4 py-4 font-medium text-black">Spesialisasi</th>
              <th className="px-4 py-4 font-medium text-black">Pengalaman</th>
              <th className="px-4 py-4 font-medium text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {fishExperts.filter(expert => expert.name.toLowerCase().includes(searchExpert.toLowerCase())).map(expert => (
              <tr key={expert.fishExperts_id}>
                <td className="border-b px-4 py-5">{expert.name}</td>
                <td className="border-b px-4 py-5">{expert.email || "-"}</td>
                <td className="border-b px-4 py-5">{expert.specialization}</td>
                <td className="border-b px-4 py-5">{expert.experience}</td>
                <td className="border-b px-4 py-5">
                  <button className="text-blue-500" onClick={() => router.push(`/editexpert/${expert.fishExperts_id}`)}>Edit</button>
                  <button className="ml-4 text-green-500" onClick={() => router.push(`/expertdetail/${expert.fishExperts_id}`)}>Detail</button>
                  <button className="ml-4 text-red-500" onClick={() => handleDelete(expert.fishExperts_id, "expert")}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

};

export default TableAkun;
