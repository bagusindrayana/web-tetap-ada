import { getIronSession } from 'iron-session';
import { sessionOptions } from '../../utils/withSession';
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const { email, password } = req.body;
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          email: email,
          password: password,
        });
        if (response.status === 200) {
          
          const json = await response.data.data;
          const session : any = await getIronSession(req, res, sessionOptions);
          session.token = json.token;
          await session.save();
          // myCookies.set('token', json.token, {
          //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
          //     httpOnly: true,
          //     secure: process.env.NODE_ENV === 'production',
          //     sameSite: 'strict',
          //     path: '/',
          // });
          
          res.status(200).json(response.data.data.token);
        } else {
          res.status(401).json({ error: "Invalid credentials" });
          
        }
      } catch (error : any) {
        res.status(500).json({ error: "Server Error : "+error.message });
      }

     
      
     
      break;
    default: 
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
  
  
}

