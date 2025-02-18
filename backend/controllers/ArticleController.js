import Article from "../models/ArticleModel.js";

// Fungsi untuk mendapatkan semua artikel
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data artikel', error });
  }
};

// Fungsi untuk mendapatkan artikel berdasarkan ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data artikel', error });
  }
};

// Fungsi untuk menambahkan artikel baru
export const createArticle = async (req, res) => {
  try {
    const { author, title, category, description, url, urltoimage, contents } = req.body;
    const newArticle = await Article.create({ author, title, category, description, url, urltoimage, contents });
    res.status(201).json({ message: 'Artikel berhasil ditambahkan', newArticle });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan artikel', error });
  }
};

// Fungsi untuk memperbarui data artikel
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    const { author, title, category, description, url, urltoimage, contents } = req.body;
    await article.update({ author, title, category, description, url, urltoimage, contents });

    res.status(200).json({ message: 'Artikel berhasil diperbarui', article });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui artikel', error });
  }
};

// Fungsi untuk menghapus artikel
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    await article.destroy();
    res.status(200).json({ message: 'Artikel berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus artikel', error });
  }
};
