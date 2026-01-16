import React from 'react'

function Button({title,onClick}) {
  return (
    <div>
      <button
      className="px-6  bg-blue-600 text-white font-semibold rounded-lg 
             hover:bg-blue-700 transition duration-200 
             focus:outline-none focus:ring-2 focus:ring-blue-400 "
             onClick={onClick}
      >
    {title}
</button>
    </div>
  )
}

export default Button