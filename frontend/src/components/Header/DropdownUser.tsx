'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import React from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/logout");
  };
  
  return (
    <button onClick={handleLogout} className="text-sm font-medium">
      Logout
    </button>
  );
};

const DropdownUser: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decodedToken: any = jwtDecode(token);
        setAdminName(decodedToken.name || "Admin");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        {/* Nama Admin */}
        <span className="text-xl font-semibold">{adminName}</span>

        {/* Icon Profil */}
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/icon/profile.svg"}
            style={{ width: "auto", height: "auto" }}
            alt="User"
          />
        </span>

        {/* Icon Dropdown */}
        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                href="/profil"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                    fill=""
                  />
                  <path
                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                    fill=""
                  />
                </svg>
                Profil
              </Link>
            </li>
          </ul>

          <div className="px-6 py-5">
            <LogoutButton />
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;