import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='flex gap-4 justify-center w-full items-center h-[100vh]'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-6 px-4 rounded-sm'>
            <a href='https://pp-costing.vercel.app/'>PP Costing</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-6 px-4 rounded-sm'>
            <Link to={'/uniflex'}>Uniflex Chart</Link>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-6 px-4 rounded-sm'>
            <a href='https://mawais20212021.neocities.org/chart/excelsheet'>BOPP Bags</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-6 px-4 rounded-sm'>
            <a href='https://nonwoven-chart.vercel.app/'>NonWoven Sheet Print</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-6 px-4 rounded-sm'>
            <a href='https://nonwoven-bags.vercel.app/'>NonWoven Bags</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-6 px-4 rounded-sm'>
            <a href='https://mawais20212021.neocities.org/chart/bagcosting'>NonWoven Bag Costing</a>
        </button>
    </div>
  )
}

export default Home
