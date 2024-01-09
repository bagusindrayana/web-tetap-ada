import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session';
import { sessionOptions } from './utils/withSession';
import axios from 'axios';
 
// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest)  {
    const res = NextResponse.next();
    //get token
    const session = await getIronSession(req, res, sessionOptions);
    const token = session.token;

    // if token null
    if(!token || token === null || token === undefined || token === '') {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    // res.cookies.set('token', token, {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     path: '/',
    //     secure: process.env.NODE_ENV === 'production',
    
    // });
    return res;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/my/website','/api/websites'],
}