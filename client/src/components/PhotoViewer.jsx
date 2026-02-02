import React from 'react'
import {useState} from 'react'

function PhotoPreviewer({imgUrl,show,onClose}) {
   
    if(!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 py-20">
        <span onClick={onClose} className='text-white absolute top-4 right-4 text-2xl cursor-pointer'>X</span>
      <img src={imgUrl} alt="Preview" className="max-w-full max-h-full rounded-lg" />   
    </div>
  )
}

function PhotoViewer({imgUrl,index}) {
     const [showPreview,setShowPreview]=useState(false);
    return (
        <>

    <img key={index} src={imgUrl} alt="Tour" className="mt-4 w-34 h-34 object-cover rounded-md cursor-pointer" 
    onClick={()=>setShowPreview(true)}/>


         <PhotoPreviewer key={imgUrl} imgUrl={imgUrl} show={showPreview} onClose={()=>{
            setShowPreview(false);
         }}/>
        </>
)}

export default PhotoViewer