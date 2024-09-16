import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='flex flex-col lg:flex-row gap-4 justify-center flex-wrap w-full h-[120vh]'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[50px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://pp-costing.vercel.app/'>PP Costing</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[50px] text-lg py-8 px-4 rounded-sm'>
            <Link to={'/uniflex'}>Uniflex Chart</Link>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[50px] text-xl py-8 px-4 rounded-sm'>
            <a href='https://mawais20212021.neocities.org/chart/excelsheet'>BOPP Bags</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[50px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://nonwoven-chart.vercel.app/'>Non Woven Sheet Print</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[50px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://nonwoven-bags.vercel.app/'>Non Woven Bags</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[50px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://mawais20212021.neocities.org/chart/bagcosting'>Non Woven Bag Costing</a>
        </button>
    </div>
  )
}

export default Home
