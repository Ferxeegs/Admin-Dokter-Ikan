import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTransaksi from "@/components/Tables/TableTransaksi";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Pembayaran",
  description:
    "Tabel Pembayaran",
};

const Transaksi = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Pembayaran" />

      <div className="flex flex-col gap-10">
        <TableTransaksi />
      </div>
    </DefaultLayout>
  );
};

export default Transaksi;
