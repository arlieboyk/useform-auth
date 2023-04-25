"use client";
import React, { useContext, useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import { Calendar, Checkbox, Form } from 'antd';
import { useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import { MyContext } from "./Context";




export default function page() {
  const [componentDisabled, setComponetDisabled] = useState(true)
  const [date, setDate] = useState('')
  const router = useRouter()
  const { data: session } = useSession();





  // if (!session) {
  //   router.push('/login')
  // }


  const handleSignOut = () => {
    signOut({ callbackUrl: "http://localhost:3000/login" });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  };



  const context = useContext(MyContext)
  return (

    <div className="flex flex-col">

      {session && (
        <>
          <Title level={2}>{session.expires}</Title>
          <button onClick={handleSignOut}>SignOut</button>
        </>
      )}

      {!session && (
        <>
          <h2>Guest User</h2>
          <button onClick={() => handleGithubSignIn}>Sign in</button>
        </>
      )}
    </div>
  );
}
