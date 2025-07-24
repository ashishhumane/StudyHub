import React from 'react'
import { X, Calendar } from "lucide-react";

const noteCrad = ({ note, deleteNote }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                    {note.title}
                </h3>
                <button
                    onClick={() => deleteNote(note._id)}
                    className="p-1 hover:bg-red-50 hover:text-red-600 text-gray-400 rounded transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.content}</p>
            <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(note.createdAt).toLocaleString()}
            </div>
        </div>
    )
}

export default noteCrad
