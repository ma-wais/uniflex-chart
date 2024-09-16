import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div className='flex flex-col lg:flex-row gap-4 justify-center mx-5 lg:ml-0 flex-wrap mt-4 w-[90%] lg:w-full h-[100vh]'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[80px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://pp-costing.vercel.app/'>PP Costing</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[80px] text-lg py-8 px-4 rounded-sm'>
            <Link to={'/uniflex'}>Uniflex Chart</Link>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[80px] text-xl py-8 px-4 rounded-sm'>
            <a href='https://mawais20212021.neocities.org/chart/excelsheet'>BOPP Bags</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[100px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://nonwoven-chart.vercel.app/'>Non Woven Sheet Print</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[80px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://nonwoven-bags.vercel.app/'>Non Woven Bags</a>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold h-[100px] text-lg py-8 px-4 rounded-sm'>
            <a href='https://mawais20212021.neocities.org/chart/bagcosting'>Non Woven Bag Costing</a>
        </button>
    </div>
  )
}

export default Home
