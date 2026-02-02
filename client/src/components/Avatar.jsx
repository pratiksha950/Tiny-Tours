import React from 'react'

function Avatar({name,size="medium"}) {
    const firstLetter = name?.charAt(0)

    const sizeClasses = {
        small: "h-6 w-6 text-xs",
        medium: "h-8 w-8 text-sm",
        large: "h-12 w-12 text-base"
    }
  return (
    <div>
        
   <span className={`bg-black text-white flex items-center justify-center ${sizeClasses[size]} rounded-full
   text-lg font-semibold`}>
    {firstLetter}</span>

    </div>
  )
}

export default Avatar