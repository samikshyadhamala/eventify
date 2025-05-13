'use client';
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Application = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Application
