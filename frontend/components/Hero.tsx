'use client'
import React from 'react'
import useSWR from 'swr';
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import Link from 'next/link';
const apiUrl = 'http://localhost:5000/books';

interface AllBook {
  title: string;
  author: string;
  publishYear: number;
}
interface Book {
  allBook: AllBook,
  _id: string
}
const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data as Book[]
};


const Home = () => {
  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data.allBook, typeof data);

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center">
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link href="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" /></Link>
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
              <th className='border border-slate-600 rounded-md '>Operations</th>
            </tr>

          </thead>
          <tbody>
            {
              data.allBook?.map((book, index) => (
                <tr key={book._id} className="h-8">
                  <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                  <td className=' border border-slate-700 rounded-md text-center' >
                    <div className="flex justify-center gap-x-4">
                      <Link href={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-green-800 text-2xl" /></Link>
                      <Link href={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-yellow-600 text-2xl" /></Link>
                      <Link href={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-sky-800 text-2xl" /></Link>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Home;
