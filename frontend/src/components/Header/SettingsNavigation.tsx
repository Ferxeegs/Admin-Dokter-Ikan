import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SettingsNav = () => {
  return (
    <li className="relative">
      <Link
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        href="/settings" // Link to the settings page
      >
        <Image
          width={20}
          height={10}
          src={"/images/icon/settings.svg"}
          alt="Settings Icon"
          priority
        />
      </Link>
    </li>
  );
};

export default SettingsNav;
