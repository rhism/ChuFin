import React, { ReactNode } from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center px-4 sm:px-6'>
        {children}
        </div>
  )
}

export default layout