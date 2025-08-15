import React from 'react'

interface TitleDividerProps {
  title: string;
}

export const TitleDivider = ({ title }: TitleDividerProps) => {
  return (
    <div className="flex items-center my-4">
        <h3 className="text-[10px] font-semibold text-stone-600 mr-1 uppercase">{title}</h3>
        <hr className="flex-1 align-middle border-stone-600 border-1" />
    </div>
  )
}
