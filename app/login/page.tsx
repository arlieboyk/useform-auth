"use client";
import Image from "next/image";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
type Inputs = {
  name: string;
  password: string;
};

let render = 0;

export default function Home() {
  const [popUp, setPopUp] = useState(false)
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading, isValid },
  } = useForm<Inputs>();
  render++;
  console.log("isValid ", isValid);




  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    const res = await fetch('http://localhost:3000/api/login',
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    )
    const response = await res.json()
    if (response.status == '500') {
      console.log(response)
      alert('Successful')
      router.replace('/')

    } else {
      console.log(`${response.status} ${response.msg}`)
      setPopUp(true)
      setTimeout(() => {
        setPopUp(false)
      }, 5000);
    }

  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  };

  if (session) {
    router.push('/')
  }

  // console.log(watch("name")); // watch input value by passing the name of it
  return (
    <>
      <main className="relative flex  flex-col h-screen justify-center items-center bg-slate-900">
        <span className="text-center bg-gray-300 rounded w-10"> {render}</span>

        <div className={`absolute top-16 right-20 px-5 py-2 w-auto rounded border border-red-300  bg-red-500 opacity-60 text-white transition-all delay-200  ${popUp ? " translate-y-0" : " -translate-y-72"}`}>Wrong credentials</div>
        <form
          onSubmit={handleSubmit(onSubmit, (data) => {
            console.log("validation", data);
          })}
          className="flex flex-col relative justify-center items-center space-y-5 h-1/2 w-11/12 max-w-[25rem] min-h-[20rem] bg-white  py-6 border-2 rounded"
        >
          <span className="text-lg font-semibold absolute top-6">TITLE</span>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            {...register("name", {
              required: "This is required",
              minLength: {
                value: 4,
                message: "Min lenght is 4",
              },
            })}
            placeholder="Name"
            // maxLength={30}
            // showCount
            // prefix={<UserOutlined />}

            className={`w-10/12 border rounded px-2 py-1 focus:outline-none ${errors.name ? "border-red-700 animate-shake" : ""
              }`}
          />
          <span className="text-red-500">{errors.name?.message}</span>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is reuiqred",
              minLength: { value: 8, message: "Password minimun should be 8" },
            })}
            className={`w-10/12 border rounded px-2 py-1 focus:outline-none ${errors.password ? "border-red-700 animate-shake" : ""
              }`}
          // prefix={<KeyOutlined />}
          />
          <span className="text-center text-red-500">
            {errors.password?.message}
          </span>
          <input
            type="submit"
            value={isLoading ? "Logging in..." : "Log in"}
            placeholder={`${isLoading ? "Loading.." : "Login"}`}
            className="w-10/12 border px-4 py-1 hover:border-blue-500 hover:bg-transparent hover:text-blue-500 rounded bg-blue-500 text-white duration-200 cursor-pointer"
          />

          <button onClick={handleGithubSignIn} className="border border-slate-400 rounded w-10/12 px-4 py-1">Signin With Github</button>
        </form>
      </main>
    </>
  );
}
