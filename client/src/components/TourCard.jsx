import React from 'react'
import {Building2} from "lucide-react"
import Avatar from './Avatar';

function TourCard({_id,title,Description,cities,user,Photos,createdAt,updatedAt,StartDate,EndDate}) {
  const {name,email}=user;
  return (
<div className="w-2/3 mx-auto my-6 rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-xl">
  
  <h1 className="text-lg font-semibold text-gray-800 mb-2">
    {title}
  </h1>

  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
    {Description}
  </p>

  <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700">
    <Building2 className="w-4 h-4 text-gray-500" />

    {cities.map((city) => (
      <span
        key={city}
        className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
      >
        {city}
      </span>
    ))}
  </div>

  <div className='flex items-center'>
    <span className='mr-2'>Posted by:</span>
    <Avatar name={name} size={"small"}/>
     <strong className='ml-2'>{name} </strong> ({email})
  </div>

    <div className='mt-4 flex flex-wrap gap-2'>
  {Photos.map((photo,index)=>{
    return <img key={index} src={photo} alt={title} className="mt-4 w-34 h-34 object-cover rounded-md cursor-pointer" />
  })}
  </div>
</div>
  )
}

export default TourCard