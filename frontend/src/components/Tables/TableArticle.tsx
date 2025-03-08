"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";

const TableArticle = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/articles`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data artikel");
        }
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data artikel.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const handleDelete = async () => {
    if (!selectedArticle) return;
    try {
      const response = await fetch(`${API_BASE_URL}/article/${selectedArticle.article_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data artikel");
      }
      setPopupMessage("Artikel berhasil dihapus!");
      setTimeout(() => setPopupMessage(""), 2000);
      const updatedArticles = articles.filter(
        (article) => article.article_id !== selectedArticle.article_id
      );
      setArticles(updatedArticles);
      setFilteredArticles(updatedArticles);
    } catch (error) {
      console.error("Error deleting article:", error);
    } finally {
      setShowModal(false);
      setSelectedArticle(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(value)
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {popupMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-100">
          <p className="text-lg font-semibold">{popupMessage}</p>
        </div>
      )}
      <div className="flex justify-between mb-4">
        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Cari judul artikel..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-600">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">Judul Artikel</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Penulis</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Kategori</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Deskripsi</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Konten</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.article_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{article.title}</td>
                  <td className="px-4 py-2">{article.author}</td>
                  <td className="px-4 py-2">{article.category}</td>
                  <td className="px-4 py-2">{article.description}</td>
                  <td className="px-4 py-2">{article.contents.length > 260 ? `${article.contents.slice(0, 260)}...` : article.contents}</td>
                  <td className="border-b px-4 py-5">
                    <button
                      className="ml-4 text-blue-500"
                      onClick={() => router.push(`/editarticle?id=${article.article_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-4 text-green-500"
                      onClick={() => router.push(`/articledetail?id=${article.article_id}`)}
                    >
                      Detail
                    </button>                   
                    <button 
                        className="ml-4 text-red-500" 
                        onClick={() => { setSelectedArticle(article); setShowModal(true); }} >
                        Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredArticles.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Data tidak dapat ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-4">Apakah Anda yakin ingin menghapus artikel ini?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Hapus</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableArticle;