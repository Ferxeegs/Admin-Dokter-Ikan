"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableArticle from "@/components/Tables/TableArticle";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Article = () => {
  const router = useRouter();
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        try {
          const response = await fetch(`${API_BASE_URL}/articles`);
          const textResponse = await response.text(); // Mendapatkan response sebagai text
          console.log(textResponse); // Log response body
          
          if (!response.ok) {
            throw new Error("Failed to fetch articles");
          }
          const data = JSON.parse(textResponse); // Parsing response
          console.log(data); // Pastikan ini adalah array atau objek yang benar
          setTotalArticles(data.length); // Memperbarui state totalArticles
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      };
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Daftar Artikel" />

      <div className="flex justify-between mt-5 mb-4">
        <span className="bg-gray-200 text-black rounded-2xl px-6 py-2 font-medium">
          Total Artikel: {totalArticles}
        </span>
        <button
          onClick={() => router.push("/addarticle")}
          className="bg-blue-500 text-white rounded-2xl px-6 py-2 font-medium hover:bg-opacity-90"
        >
          Tambah Artikel
        </button>
      </div>

      <div className="flex flex-col gap-10">
        <TableArticle />
      </div>
    </DefaultLayout>
  );
};

export default Article;
