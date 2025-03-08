"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Article } from "@/types/article";
import Image from "next/image";

const ArticleDetailPage = () => {
  const searchParams = useSearchParams(); 
  const id = searchParams.get("id");
  const router = useRouter(); // Hook untuk navigasi
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/article/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data artikel");

        const articleData: Article = await response.json();
        setArticle(articleData);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticleDetail();
  }, [id, API_BASE_URL]);

  if (loading) return <div className="text-gray-500 text-center">Memuat data...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Detail Artikel" />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detail Artikel</h2>

        {article ? (
          <div>
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="mt-2"><strong>Author:</strong> {article.author}</p>
            <p className="mt-2"><strong>Kategori:</strong> {article.category}</p>
            <p className="mt-2"><strong>Deskripsi:</strong> {article.description}</p>
            <p className="mt-2"><strong>Author:</strong> {article.author}</p>
            <div className="mt-4">
              <strong>Konten Artikel:</strong>
              <p>{article.contents}</p>
            </div>
            <div className="mt-4">
              <strong>URL:</strong> 
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{article.url}</a>
            </div>

            {/* Menampilkan gambar artikel */}
            <div className="mt-4 flex justify-center">
              {article.urltoimage ? (
                <Image
                  src={`${API_BASE_URL}${article.urltoimage}`}
                  alt={article.title}
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full max-h-[300px] border"
                  unoptimized={true}
                />
              ) : (
                <div className="w-full max-h-[300px] flex items-center justify-center bg-gray-200 rounded-lg">
                  <p className="text-gray-500">Tidak ada gambar</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Data tidak ditemukan.</p>
        )}
      </div>

      {/* Tombol Kembali di luar Card */}
      <div className="max-w-xl mx-auto flex justify-end mt-4">
        <button
          onClick={() => router.push("/article")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Kembali
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ArticleDetailPage;