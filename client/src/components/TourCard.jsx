import React from 'react'
import {Building2} from "lucide-react"
import Avatar from './Avatar';
import PhotoViewer from './PhotoViewer';
import { Footprints ,LandPlot} from 'lucide-react';
import {Pencil} from 'lucide-react';
import { Link } from 'react-router-dom';

function TourCard({_id,title,Description,cities,user,photos,startDate,endDate}) {
  const {name,email}=user;
  return (
<div className="relative w-2/3 mx-auto my-6 rounded-xl border border-gray-200 bg-white p-5 shadow-md transition hover:shadow-xl">
  
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
    <div className='ml-4 flex items-center gap-2 text-gray-600 py-5 px-3'>
    <Footprints />Started on: {new Date(startDate).toLocaleDateString("en-IN")} &nbsp; &nbsp;
    <LandPlot />Ends on: {new Date(endDate).toLocaleDateString("en-IN")}
</div>
  </div>

  <div className='flex items-center'>
    <span className='mr-2'>Posted by:</span>
    <Avatar name={name} size={"small"}/>
     <strong className='ml-2'>{name} </strong> ({email})
  </div>

<div className="mt-4 flex flex-wrap gap-2">
        {photos?.map((photo, index) => (
          <PhotoViewer key={index} imgUrl={photo} index={index} />
        ))}
      </div>
      <Link to={`/tours/${_id}/edit`}>
      <Pencil className='absolute top-2 right-2 h-6 w-6 mt-2 cursor-pointer'/></Link>

      </div>
  )
}

export default TourCard