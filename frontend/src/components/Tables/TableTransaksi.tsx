"use client";

import { useEffect, useState } from "react";
import { Transaksi } from "@/types/transaksi";
interface User {
  user_id: number;
  name: string;
  email: string;
}

const TableTransaksi = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, consultationsRes] = await Promise.all([
          fetch("http://localhost:9001/users"),
          fetch("http://localhost:9001/user-consultations"),
          fetch("htpp://localhost:9001/")
        ]);

        if (!usersRes.ok || !consultationsRes.ok) {
          throw new Error("Gagal mengambil data");
        }

        const users: User[] = await usersRes.json();
        const consultationsData = await consultationsRes.json();

        // Mapping user_id ke name dan email
        const userMap = new Map(users.map((user) => [user.user_id, user]));

        // Format data transaksi dengan nama dan email yang sesuai
        const formattedData: Transaksi[] = consultationsData.data.map((item: any) => ({
          user_consultation_id: item.user_consultation_id,
          name: userMap.get(item.user_id)?.name || "Unknown",
          email: userMap.get(item.user_id)?.email || "Unknown",
          topikKonsultasi: item.consultation_topic,
          status: item.consultation_status,
        }));

        setTransaksi(formattedData);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter transaksi berdasarkan input pencarian
  const filteredTransaksi = transaksi.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <p className="text-gray-600">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[180px] px-4 py-4 font-medium text-black dark:text-white">
                  Topik Konsultasi
                </th>
                <th className="min-w-[130px] px-4 py-4 font-medium text-black dark:text-white">
                  Obat
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status Chat
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                  Total
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransaksi.length > 0 ? (
                filteredTransaksi.map((item) => (
                  <tr key={item.user_consultation_id}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">{item.name}</h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.email}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.topikKonsultasi}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        <div>
                          Lihat Obat
                        </div>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                      <div>
                          Aktif
                        </div>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        <div>
                          Rp. (Total)
                        </div>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <span
                        className={`px-3 py-1 rounded-lg text-white ${
                          item.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-gray-500">
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

export default TableTransaksi;
