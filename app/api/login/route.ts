import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

type bodyType = {
  name: string
  password: string
}

export async function POST(request: Response) {
  const res = await request.json();
  // console.log(res)
  if (res.name == process.env.USER && res.password == process.env.PASS) {
    return NextResponse.json({ status: 500, msg: ` Successful` })
  }
  console.log('error')
  return NextResponse.json({ status: 400, msg: "Wrong credentials" })
}


export async function GET(request: Request) {
  return new Response('test')
}

// export async function 1POST(request: NextApiRequest, response: NextApiResponse)
//  { const post= await request.body; 
//   if (!post.title) 
//   { return response.status(400).json({ message: "Please enter title", }); }}