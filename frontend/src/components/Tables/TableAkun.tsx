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
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await fetch("http://localhost:9001/users");
      const usersData: Akun[] = await usersResponse.json();
      setUsers(usersData);

      const fishExpertsResponse = await fetch("http://localhost:9001/fishexperts");
      const fishExpertsData: FishExpert[] = await fishExpertsResponse.json();
      setFishExperts(fishExpertsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id: number, type: "user" | "expert") => {
    const endpoint = type === "user" ? `users/${id}` : `fishexperts/${id}`;
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(`http://localhost:9001/${endpoint}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus data");
        }

        fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Tabel User */}
      <div className="rounded-lg border border-stroke bg-white p-5 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Daftar User</h2>
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
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">Nama</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Role</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(user => user.name.toLowerCase().includes(searchUser.toLowerCase())).map((user) => (
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
        </div>
      </div>

      {/* Tabel Expert */}
      <div className="rounded-lg border border-stroke bg-white p-5 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Daftar Expert</h2>
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
              <tr className="bg-green-200 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">Nama</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Spesialisasi</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Pengalaman</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {fishExperts.filter(expert => expert.name.toLowerCase().includes(searchExpert.toLowerCase())).map((expert) => (
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
