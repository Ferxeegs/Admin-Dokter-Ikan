"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Akun } from "@/types/akun";

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<Akun | null>(null);
  const [formData, setFormData] = useState<Akun | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchUserDetail = async () => {
        try {
          const response = await fetch(`http://localhost:9001/users/${id}`);
          const userData: Akun = await response.json();
          setUser(userData);
          setFormData(userData); // Mengatur data yang diambil ke dalam form
        } catch (error) {
          console.error("Error fetching user detail:", error);
        }
      };
      fetchUserDetail();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData?.name || !formData?.email || !formData?.role) {
      setError("Semua field harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:9001/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data user.");
      }

      // Jika sukses, kembali ke halaman detail user
      router.push(`/userdetail/${id}`);
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit User" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit User</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData?.role || "user"}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Alamat</label>
            <input
              type="text"
              name="address"
              value={formData?.address || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Memperbarui..." : "Perbarui User"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditUserPage;
