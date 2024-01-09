import { getIronSession } from 'iron-session';
import { sessionOptions } from '../../utils/withSession';
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        const session = await getIronSession(req, res, sessionOptions);
        await session.destroy();
        res.status(200).json({ message: "Logged out" });
      } catch (error : any) {
        res.status(500).json({ error: "Server Error : "+error.message });
      }
      break;
    default: 
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }
  
  
}

