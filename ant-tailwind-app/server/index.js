require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Candidate = require('./models/Candidate');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/HRPortal';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
// Get all candidates
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    const formatted = candidates.map(c => ({
      ...c._doc,
      key: c._id.toString()
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Create a new candidate
app.post('/api/candidates', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json({
      ...candidate._doc,
      key: candidate._id.toString()
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to add candidate' });
  }
});

// Update a candidate
app.put('/api/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
    res.json({
      ...candidate._doc,
      key: candidate._id.toString()
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update candidate' });
  }
});

// Delete a candidate
app.delete('/api/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
