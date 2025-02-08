"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Akun } from "@/types/akun";

const UserDetailPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<Akun | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchUserDetail = async () => {
        try {
          const response = await fetch(`http://localhost:9001/users/${id}`);
          const userData: Akun = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user detail:", error);
        }
      };
      fetchUserDetail();
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail User" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail User</h2>

        <div>
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Alamat:</strong> {user.address || "Tidak ada alamat"}</p>
        </div>

        {/* Tombol Kembali di kanan bawah */}
        <button
          onClick={() => router.push("/akun")}
          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default UserDetailPage;
