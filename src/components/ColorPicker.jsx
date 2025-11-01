import React, { useState } from 'react'

const ColorPicker = ({SelectedColor ,onChange}) => {

  const colors = [
    {name: "Blue", value: "#3B82F6"},
    {name: "Indigo", value: "#6366f1"},
    {name: "Purple", value: "#8B5CF6"},
    {name: "Green", value: "#10B981"},
    {name: "Red", value: "#EF4444"},
    {name: "Orange", value: "#F97316"},
    {name: "Teal", value: "#14B8A6"},
    {name: "Pink", value: "#EC4899"},
    {name: "Gray", value: "#6B7280"},
    {name: "Black", value: "#1F2937"},
  ]

  const [isOpen,SetIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button onClick={()=> SetIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-5"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg> <span className='max-sm:hidden'>Accent</span>
      </button>

      {isOpen && (
        <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
          {colors.map((colors)=>(
            <div key={colors.value} className='relative cursor-pointer group flex flex-col'onClick={()=> {onChange(colors.value); SetIsOpen(false)}}>
              <div className='w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors' style={{backgroundColor : colors.value}}>

              </div>
              {SelectedColor === colors.value && (
                <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                  {/* check   */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" classname="size-5 text-white"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
              )}
              <p className='text-xs text-center mt-1 text-gray-600'>{colors.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ColorPicker
