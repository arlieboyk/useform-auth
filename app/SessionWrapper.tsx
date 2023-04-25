"use client";
import { createContext } from 'react';
import { SessionProvider, useSession } from "next-auth/react";
import { MyContext } from './Context';

export default function SessionWrapper({ children }: { children: React.ReactNode; }) {

  return <SessionProvider>
    {/* <MyContext.Provider value={session}> */}
    {children}
    {/* </MyContext.Provider > */}
  </SessionProvider>;
}


