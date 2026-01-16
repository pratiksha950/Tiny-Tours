import React from 'react'

function Input({type,placeholder,value,onChange}) {
  return (
    <div>
        <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"  
        > </Input>
    </div>
  )
}

export default Input