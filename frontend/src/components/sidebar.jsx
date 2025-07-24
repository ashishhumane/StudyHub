import React from 'react'
import { CircleUser, House, NotebookPen, Bot, Brain } from 'lucide-react'
import { Link } from "react-router"
const Sidebar = ({user}) => {
    const navItems = [
        { icon: <House />, label: "Dashboard", href: "/dashboard" },
        { icon: <NotebookPen />, label: "Notes", href: "/notes" },
        { icon: <Bot />, label: "Chatbot", href: "/chatbot" },
        { icon: <Brain />, label: "Summarizer", href: "/summarizer" },
    ];

    return (
        <aside className='fixed top-[60px] left-0 w-[280px] h-[calc(100%-60px)] bg-white shadow-md shadow-zinc-700 py-6 px-2 text-blue-950'>
            <ul>
                {navItems.map((item, idx) => (
                    <li key={idx} className='flex items-center gap-3 px-4 py-2 hover:bg-blue-50 rounded'>
                        {item.icon}
                        <Link to={item.href}>{item.label}</Link>
                    </li>
                ))}
            </ul>

            <div className='relatve py-2 mt-[370px] bg-blue-50 border-l-4 rounded border-l-blue-950'>
                <div className='flex justify-center '>
                   <CircleUser size={40} absoluteStrokeWidth />
                </div>
                <h2 className='flex justify-center'>{user && user.username}</h2>
                <p className='flex justify-center'>{user && user.email}</p>
            </div>
        </aside>
    )
}

export default Sidebar
