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
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (id) {
      const fetchUserDetail = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/users/${id}`);
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

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail User</h2>

        <div>
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Alamat:</strong> {user.address || "Tidak ada alamat"}</p>
        </div>
      </div>

      {/* Tombol Kembali di luar Card */}
      <div className="max-w-xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => router.push("/akun")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default UserDetailPage;
