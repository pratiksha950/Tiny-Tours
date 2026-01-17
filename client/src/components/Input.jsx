import React from "react"

function Input({ type, placeholder, value, onChange, autoComplete,onKeyDown }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      onKeyDown={onKeyDown}
      className="border rounded h-8 block w-full text-sm text-center"
    />
  )
}

export default Input
