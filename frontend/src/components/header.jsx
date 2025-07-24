import { BookOpen, House, NotebookPen, Bot, Brain } from 'lucide-react'
import { Link } from "react-router"

const Header = ({handleLogout}) => {
    return (
        <>
            {/* Header */}
            <header className='fixed w-full top-0 bg-white h-[60px] flex justify-between items-center px-[100px] text-xl text-zinc-800 font-bold z-20 shadow-md'>
                <div className='flex items-center'>
                    <BookOpen />
                    <h2 className='ml-2 cursor-pointer font-title font-bold'>StudyHub</h2>
                    <Link to="#" className='bg-blue-600 py-1 px-2 ml-5 rounded text-white shadow-md'>Dashboard</Link>
                </div>
                <Link onClick={handleLogout} to="#" className='bg-red-600 py-1 px-2 rounded text-white transform duration-200 hover:scale-105 shadow-xl'>Logout</Link>
            </header>
        </>
    )
}

export default Header
