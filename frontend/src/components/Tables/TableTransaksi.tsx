"use client";

import { useEffect, useState } from "react";

interface User {
  user_id: number;
  name: string;
  email: string;
  address: string | null;
  phone_number: string | null;
}

interface Consultation {
  consultation_id: number;
  consultationTopic: string;
  chatEnabled: boolean;
}

interface Payment {
  payment_id: number;
  consultation_id: number;
  total_fee: number;
  payment_status: string;
  shipping_fee: number;
  payment_method: string;
  payment_proof: string | null;
  Consultation: {
    user_id: number;
  };
}

const TableTransaksi = () => {
  const [transactions, setTransactions] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fetchConsultationsAndPayments = async () => {
      try {
        const [consultationsRes, paymentsRes, usersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/consultations`),
          fetch(`${API_BASE_URL}/payments`),
          fetch(`${API_BASE_URL}/users`),
        ]);

        if (!consultationsRes.ok || !paymentsRes.ok || !usersRes.ok) {
          throw new Error("Gagal mengambil data");
        }

        const consultationsData = await consultationsRes.json();
        const paymentsData = await paymentsRes.json();
        const usersData = await usersRes.json();

        const formattedConsultations = consultationsData.map((consultation: any) => ({
          consultation_id: consultation.consultation_id,
          consultationTopic: consultation.UserConsultation?.consultation_topic || "Tidak ada topik",
          chatEnabled: consultation.chat_enabled,
        }));

        const formattedPayments = paymentsData.map((payment: any) => ({
          payment_id: payment.payment_id,
          consultation_id: payment.consultation_id,
          total_fee: payment.total_fee,
          payment_status: payment.payment_status,
          shipping_fee: payment.shipping_fee,
          payment_method: payment.payment_method,
          payment_proof: payment.payment_proof || null,
          Consultation: {
            user_id: payment.Consultation?.user_id,
          },
        }));

        setConsultations(formattedConsultations);
        setTransactions(formattedPayments);
        setUsers(usersData);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultationsAndPayments();
  }, []);

  // Filter transaksi berdasarkan nama
  const filteredTransactions = transactions.filter((payment) => {
    const user = users.find((u) => u.user_id === payment.Consultation.user_id);
    return user?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const openModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const updateStatus = async () => {
    if (!selectedPayment) return;
    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const newStatus = selectedPayment.payment_status === "pending" ? "selesai" : "pending";

    try {
      const response = await fetch(`${API_BASE_URL}/payments/${selectedPayment.payment_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui status");
      }

      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.payment_id === selectedPayment.payment_id
            ? { ...transaction, payment_status: newStatus }
            : transaction
        )
      );

      closeModal();
    } catch (error) {
      setError("Gagal memperbarui status pembayaran.");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <p className="text-gray-600">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-gray-600 text-center py-4">Data tidak dapat ditemukan</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">Nama</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Nomor Telephone</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Alamat</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Topik Konsultasi</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Chat</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Total</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Biaya Pengiriman</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Metode Pembayaran</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Bukti Pembayaran</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((payment) => {
                const user = users.find((u) => u.user_id === payment.Consultation.user_id);
                const consultation = consultations.find(
                  (c) => c.consultation_id === payment.consultation_id
                );

                return (
                  <tr key={payment.payment_id}>
                    <td className="px-4 py-4">{user?.name || "Unknown"}</td>
                    <td className="px-4 py-4">{user?.email || "Unknown"}</td>
                    <td className="px-4 py-4">{user?.phone_number || "Unknown"}</td>
                    <td className="px-4 py-4">{user?.address || "Alamat tidak tersedia"}</td>
                    <td className="px-4 py-4">{consultation?.consultationTopic || "Tidak ada topik"}</td>
                    <td className="px-4 py-4">
                      {consultation?.chatEnabled ? "Aktif" : "Tidak Aktif"}
                    </td>
                    <td className="px-4 py-4">Rp. {payment.total_fee.toLocaleString()}</td>
                    <td className="px-4 py-4">Rp. {payment.shipping_fee.toLocaleString()}</td>
                    <td className="px-4 py-4">{payment.payment_method}</td>
                    <td className="px-4 py-4">
                      {payment.payment_proof ? (
                        <a href={payment.payment_proof} target="_blank" rel="noopener noreferrer">Lihat Bukti</a>
                      ) : (
                        "Tidak ada bukti"
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        className={`px-3 py-1 rounded-lg text-white ${
                          payment.payment_status === "pending" ? "bg-yellow-500" : "bg-green-500"
                        }`}
                        onClick={() => openModal(payment)}
                      >
                        {payment.payment_status}
                      </button>
                    </td>                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Konfirmasi perubahan status pembayaran?</p>
            <div className="mt-4 flex justify-end">
              <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={closeModal}>Batal</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateStatus}>Ya</button>             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTransaksi;
