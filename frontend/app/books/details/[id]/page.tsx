"use client"
import BackBtn from '@/app/components/BackBtn'
import React from 'react'
import useSWR from 'swr';
import { useParams} from 'next/navigation';


interface AllBook {
  title: string;
  author: string;
  publishYear: number;
  _id: number
}
const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data as AllBook[]
};
const Details = () => {
  const { id } = useParams()  
  const apiUrl = `http://localhost:5000/books/${id}`;

  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
<BackBtn/>
      <div className='flex items-center justify-center flex-col'>
        <h1 className='text-[#333] text-[3vw] font-md '>Book Details</h1>
        <hr className='w-[80%] h-[3px]  bg-green-500'/>
        <div className='w-[80%]'>
          <div className='flex  justify-between mx-[5%] my-[1%]'><span>Title</span><p>{data.title}</p></div>
          <hr/>
          <div className='flex  justify-between mx-[5%] my-[1%]'><span>Autor</span><p>{data.author}</p></div>
          <hr />

          <div className='flex  justify-between mx-[5%] my-[1%]'><span>Publish Year</span><p>{data.publishYear}</p></div>    <hr />
          <div className='flex  justify-between mx-[5%] my-[1%]'><span>Uploaded</span><p>{new Date(data.createdAt).toString()}</p></div>
        </div>
        <hr className='w-[80%] h-[3px]  bg-green-500' />

</div>
    </div>
  )
}

export default Details