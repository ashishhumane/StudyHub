import React, { useState, useEffect } from 'react';
import { Plus, X, Calendar, Search } from 'lucide-react';
import axios from 'axios';
import NoteCard from '../components/noteCrad';

export default function Notes() {
  const defaultNotes = [
    {
      _id: 'default-1',
      title: "Welcome to your notes",
      content: "This is your first note. You can create new notes using the sidebar form.",
      date: new Date().toLocaleDateString(),
      isDefault: true,
    },
    {
      _id: 'default-2',
      title: "Meeting Notes",
      content: "Discussed project timeline and deliverables. Next meeting scheduled for Friday.",
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      isDefault: true,
    }
  ];

  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [response, setResponse] = useState({ status: null, message: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/notes/my-notes', { withCredentials: true })
      .then(res => {
        if (res.data.length === 0) {
          setNotes(defaultNotes);
        } else {
          setNotes(res.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch notes:', err.message);
      });
  }, []);

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/notes/create',
        { formData },
        { withCredentials: true }
      );

      setResponse({ status: res.status, message: res.data.message });

      if (res.status === 201) {
        setFormData({ title: '', content: '' });

        // Optionally re-fetch notes
        const newRes = await axios.get('http://localhost:3000/notes/my-notes', { withCredentials: true });
        setNotes(newRes.data);

        setTimeout(() => {
          setResponse(null);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {response && response.status !== null && (
        <div className={`absolute bottom-2 right-3 ${response.status === 201 || response.status === 200 ? 'bg-green-600' : 'bg-red-600'} p-3 rounded-md`}>
          {response.message && (
            <p className={`text-center font-semibold ${response.status === 201 ? 'text-green-50' : 'text-red-50'}`}>
              {response.status}: {response.message}
            </p>
          )}
        </div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden bg-white shadow-lg border-r border-gray-200`}>
        <div className="p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Add New Note</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter note title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="8"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your note content here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {notes.length} notes
              </span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-gray-400">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'Create your first note using the sidebar form'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
