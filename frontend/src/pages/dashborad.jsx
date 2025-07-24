import { BookOpen, House, NotebookPen, Bot, Brain } from 'lucide-react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashborad = () => {

	const [user, setUser] = useState(null);
	const [note, setNotes] = useState(null);
	const navigate = useNavigate();
	const handleDelete = (id) => {
		const confirm = window.confirm("Are you sure you want to delete this note?");
		if (!confirm) return;

		axios.delete(`http://localhost:3000/notes/delete/${id}`, {
			withCredentials: true
		})
			.then(res => {
				alert(res.data.message);
				// Remove from state immediately
				setNotes(prev => prev.filter(note => note._id !== id));
			})
			.catch(err => {
				console.error('Error deleting note:', err.message);
				alert('Failed to delete note');
			});
	};

	const handleLogout = async () => {
		try {
			await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
			// Clear any local state if needed
			navigate('/auth'); // or window.location.href = '/login';
		} catch (err) {
			console.error('Logout failed:', err.message);
		}
	};

	useEffect(() => {
		axios.get('http://localhost:3000/user/getuser', { withCredentials: true })
			.then(res => {
				// console.log('Response from backend:', res.data);
				setUser(res.data.user);
				// console.log(user);

			})
			.catch(err => console.log('Axios error:', err.response?.data || err));
	}, []);

	useEffect(() => {
		axios.get('http://localhost:3000/notes/my-notes', {
			withCredentials: true
		})
			.then(res => {
				setNotes(res.data);
			})
			.catch(err => {
				console.error('Failed to fetch notes:', err.message);
			});
	}, []);

	const notes = [
		{
			title: "React Introduction",
			description: "Overview of React basics",
			body: "React is a JavaScript library for building user interfaces...",
			createdAt: new Date().toISOString(),
		},
		{
			title: "MongoDB Notes",
			description: "Database concepts for MongoDB",
			body: "MongoDB is a NoSQL database that stores data in JSON-like documents...",
			createdAt: new Date().toISOString(),
		},
		{
			title: "Node.js Guide",
			description: "Server-side JS with Node",
			body: "Node.js allows you to run JavaScript on the server...",
			createdAt: new Date().toISOString(),
		},
		{
			title: "MongoDB Notes",
			description: "Database concepts for MongoDB",
			body: "MongoDB is a NoSQL database that stores data in JSON-like documents...",
			createdAt: new Date().toISOString(),
		},
		{
			title: "Node.js Guide",
			description: "Server-side JS with Node",
			body: "Node.js allows you to run JavaScript on the server...",
			createdAt: new Date().toISOString(),
		}
	];

	const quotes = [
		{
			text: "Success is the sum of small efforts, repeated day in and day out.",
			author: "Robert Collier"
		},
		{
			text: "The expert in anything was once a beginner.",
			author: "Helen Hayes"
		},
		{
			text: "Don’t watch the clock; do what it does. Keep going.",
			author: "Sam Levenson"
		},
		{
			text: "Push yourself, because no one else is going to do it for you.",
			author: "Unknown"
		},
		{
			text: "Believe you can and you're halfway there.",
			author: "Theodore Roosevelt"
		},
		{
			text: "It always seems impossible until it's done.",
			author: "Nelson Mandela"
		},
		{
			text: "Study while others are sleeping; work while others are loafing; prepare while others are playing; and dream while others are wishing.",
			author: "William Arthur Ward"
		},
		{
			text: "The future belongs to those who prepare for it today.",
			author: "Malcolm X"
		},
		{
			text: "Dream big, work hard, stay focused, and surround yourself with good people.",
			author: "Unknown"
		},
		{
			text: "Your education is a dress rehearsal for a life that is yours to lead.",
			author: "Nora Ephron"
		}
	];

	const randomIndex = Math.floor(Math.random() * quotes.length)
	const randomQuote = quotes[randomIndex];



	return (
		<div className='w-full h-full bg-white'>
			{/* Header */}

			<Header handleLogout={handleLogout} />

			{/* Sidebar */}
			<Sidebar user={user} />

			{/* Main Content */}
			<main className='ml-[280px] mt-[60px] p-6 text-zinc-800'>

				{/* greeting message and userinfo  */}
				<div className='bg-white shadow-md shadow-zinc-700/30 p-5 rounded-md relative border-l-4 border-l-blue-950'>
					<h1 className='text-3xl font-bold '>Welcome {user && user.username} to StudyHub</h1>
					<p className='italic m-2 '>"{randomQuote.text}"</p>
					<p className='absolute bottom-3 right-3 '>- {randomQuote.author}</p>
				</div>

				{/* displayed notes created by user */}
				<div className="bg-white shadow-md shadow-zinc-700/30 border-l-4 border-l-slate-800 p-5 rounded-md mt-3">
					{/* Heading */}
					<h2 className="text-4xl font-bold mb-5">Your Notes</h2>

					{/* Grid layout */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{note && note.length > 0 ? (
							note.map((item, index) => (
								<div
									key={index}
									className="bg-blue-100 p-4 rounded-md shadow-xl transform duration-200 ease-in-out hover:scale-105"
								>
									<h2 className="font-bold text-zinc-800 text-lg">{item.title}</h2>
									<p className="text-sm text-zinc-400 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
									<p className="mt-4 text-zinc-600">{item.content}</p>
									<div className="flex gap-4 mt-5">
										{/* <a
											href="#"
											className="bg-blue-400 py-1 px-4 rounded text-white shadow-md hover:bg-zinc-700"
										>
											Edit
										</a> */}
										<button
											onClick={() => handleDelete(item._id)}
											className="bg-red-500 py-1 px-4 rounded text-white shadow-md hover:bg-red-700"
										>
											Delete
										</button>
									</div>
								</div>
							))
						) : (
							<p className="text-zinc-500 italic">You haven't created any notes yet.</p>
						)}
					</div>
				</div>



			</main>
		</div>
	)
}

export default Dashborad
