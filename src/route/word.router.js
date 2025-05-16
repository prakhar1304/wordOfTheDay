import express from 'express';
import { getVocabularyWord } from '../utils/getVocabularyWord.js';

const router = express.Router();

router.get('/vocab-word', async (req, res) => {
  try {
    const wordData = await getVocabularyWord();
    res.json(wordData);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

export default router;
