import React from 'react'
import Header from '../components/header';
import { Sparkles, Trash2, Copy, Download } from 'lucide-react';

const Summeriser = () => {
    return (
        <div>
            <Header />

            <div className='w-full h-[50vh] mt-[60px] flex justify-center items-center bg-blue-50'>
                <div>
                    <h2 className='flex justify-center text-5xl text-zinc-800 font-bold mb-5'>
                        Summarize Your Content Instantly
                    </h2>
                    <h3 className='flex justify-center text-2xl italic text-blue-800 '>
                        "Paste your content and get a concise summary in seconds."
                    </h3>
                </div>
            </div>

            <div className='w-[70vw] h-[70vh] mx-auto my-5 bg-blue-50 rounded-2xl shadow-md border-t'>
                <div className='h-[60px] bg-white rounded-t-2xl  border-zinc-400 border-b flex justify-start items-center'>
                    <h2 className='m-5 text-xl text-zinc-700 font-semibold '>StudyHub summerizer</h2>
                </div>

                <div className='w-1/2 h-[calc(100%-120px)] border-zinc-400 border-r'>
                    <textarea name="body" id="" placeholder='text' className='h-full w-full p-2 text-md outline-none'></textarea>
                </div>

                <div className='h-[60px] bg-white rounded-b-2xl border flex  gap-2 justify-between items-center p-2'>
                    <button className='rounded-full p-2 hover:bg-blue-300 hover:scale-100 duration-200'><Trash2 color="#212121" className='hover:scale-105 duration-200' /></button>
                    <button className='flex gap-2 bg-blue-600 py-2 px-3 rounded-md text-white transform transition-transformduration-200 hover:scale-105 group'> <Sparkles color="#f9f1f1" className='group-hover:rotate-90 duration-500' /> Generate</button>
                    <div>
                        <button className='rounded-full p-2 hover:bg-blue-300 hover:scale-100 duration-200'><Download color="#212121" className='hover:scale-105 duration-200' /></button>
                        <button className='rounded-full p-2 hover:bg-blue-300 '><Copy color="#212121" className='hover:scale-105 duration-200' /></button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Summeriser
