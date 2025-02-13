"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Profil = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna");
        }

        const data = await response.json();
        console.log("Data yang diterima:", data);

        setUser({
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profil" />
        <div className="grid gap-8">
          <div className="xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Data Diri</h3>
              </div>
              <div className="p-7">
                <form>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">
                        Nama
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        id="name"
                        value={user.name}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      id="email"
                      value={user.email}
                      readOnly
                    />
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="address">
                      Alamat
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="address"
                      value={user.address}
                      readOnly
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profil;
