import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default async function Page(req: NextRequest, res: NextResponse) {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')
    console.log(access_token)
    // 
    return "Google Login"
}