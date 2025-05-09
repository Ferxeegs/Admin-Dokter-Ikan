import FishExpertAnswer from "../models/FishExpertAnswerModel.js";
import "regenerator-runtime/runtime.js";
// Fungsi untuk mendapatkan semua jawaban dari ahli ikan
export const getAllFishExpertAnswers = async (req, res) => {
  try {
    const answers = await FishExpertAnswer.findAll();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data jawaban ahli ikan', error });
  }
};

// Fungsi untuk mendapatkan jawaban berdasarkan ID
export const getFishExpertAnswerById = async (req, res) => {
  try {
    const answer = await FishExpertAnswer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Jawaban tidak ditemukan' });
    }
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data jawaban ahli ikan', error });
  }
};

// Fungsi untuk menambahkan jawaban baru
export const createFishExpertAnswer = async (req, res) => {
  try {
    const { fishExpert_id, answer, timestamp } = req.body;

    if (!fishExpert_id || !answer) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const newAnswer = await FishExpertAnswer.create({
      fishExpert_id,
      answer,
      timestamp,
    });

    res.status(201).json({ message: 'Jawaban berhasil dibuat', newAnswer });
  } catch (error) {
    console.error('Error backend:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

// Fungsi untuk memperbarui jawaban berdasarkan ID
export const updateFishExpertAnswer = async (req, res) => {
  try {
    const answer = await FishExpertAnswer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Jawaban tidak ditemukan' });
    }

    const { answer: updatedAnswer, timestamp, consultation_status } = req.body;
    await answer.update({ answer: updatedAnswer, timestamp, consultation_status });

    res.status(200).json({ message: 'Jawaban berhasil diperbarui', answer });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui jawaban', error });
  }
};

// Fungsi untuk menghapus jawaban berdasarkan ID
export const deleteFishExpertAnswer = async (req, res) => {
  try {
    const answer = await FishExpertAnswer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Jawaban tidak ditemukan' });
    }

    await answer.destroy();
    res.status(200).json({ message: 'Jawaban berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus jawaban', error });
  }
};
