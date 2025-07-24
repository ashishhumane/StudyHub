const express = require('express')
const notesModel = require('../models/notes');
const authenticate = require('../middlewares/auth')
const router = express.Router()
const fetch = require('node-fetch');
const API_KEY = process.env.GOOGLE_API_KEY;



router.post('/create', authenticate, async (req, res) => {
  try {
    const { formData } = req.body;

    // Validate input
    if (!formData.title || !formData.content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Create new note
    const newNote = await notesModel.create({
      title: formData.title,
      content: formData.content,
      user: req.user.id // for logged in user
    });

    console.log(newNote);
    return res.status(201).json({ message: 'Note created successfully' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating note' });
  }
});

router.get('/my-notes', authenticate, async (req, res) => {
  try {
    const notes = await notesModel.find({ user: req.user.id });
    res.status(200).json(notes);
  

  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

router.delete('/delete/:id', authenticate, async (req, res) => {
  try {
    const noteId = req.params.id;

    const deletedNote = await notesModel.findOneAndDelete({
      _id: noteId,
      user: req.user.id // Ensure only owner can delete
    });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting note' });
  }
});

router.post('/chatbot', async (req, res) => {
  try {
    const userInput = req.body;
    console.log(userInput.input);

    if (!userInput) {
      return res.status(400).json({ message: 'Input text is required' });
    }

    const systemPrompt = `You are a helpful study assistant. You explain concepts clearly, generate practice questions, summarize topics, and help with studying.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "contents": [
            {
              "role": "user",
              "parts": [
                {
                  text: `You are a professional AI study assistant. Based on the topic, questions, or text provided by the user, generate a detailed and clear educational response in a structured format.

                  Begin your response with:

                  "I am an AI study assistant. How can I help you today?"

                  Add the following disclaimer on a new line at the end of your response:

                  "Disclaimer: This response is AI-generated and is intended for educational purposes only. It is not a substitute for professional advice or guidance."
                  `
                },
                { "text": userInput.input }
              ]
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google API error:', errorText);
      return res.status(response.status).json({ message: 'Google API error', details: errorText });
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content || '';

    res.json({ response: generatedText });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router