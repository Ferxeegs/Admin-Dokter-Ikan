'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  const handleCancel = () => {
    setShowModal(false);
    router.push("/dashboard");
  };

  return (
    <DefaultLayout>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Apakah Anda ingin keluar?</h2>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Ya
              </button>
              <button 
                onClick={handleCancel} 
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default LogoutPage;
