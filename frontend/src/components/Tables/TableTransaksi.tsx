"use client";

import { useEffect, useState } from "react";

interface User {
  user_id: number;
  name: string;
  email: string;
}

interface Transaksi {
  user_consultation_id: number;
  name: string;
  email: string;
  topikKonsultasi: string;
  status: string;
}

const TableTransaksi = () => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, consultationsRes] = await Promise.all([
          fetch("http://localhost:9001/users"),
          fetch("http://localhost:9001/user-consultations"),
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

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        

        {loading ? (
          <p className="text-gray-600">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[180px] px-4 py-4 font-medium text-black dark:text-white">
                  Topik Konsultasi
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((item) => (
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
                    <span
                      className={`px-3 py-1 rounded-lg text-white ${
                        item.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
                      }`}
                    >
                      {item.status}
                    </span>
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

export default TableTransaksi;
