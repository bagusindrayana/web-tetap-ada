import { getIronSession } from 'iron-session';
import { sessionOptions } from '../../utils/withSession';
import { cookies } from 'next/headers';
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const searchQuery = req.query.search;
      try {
        const session: any = await getIronSession(req, res, sessionOptions);

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/websites?search=${searchQuery}`, {
          headers: {
            'Authorization': `Bearer ${session.token}`
          }
        });
        if (response.status === 200) {
          res.status(200).json(response.data.data);
        } else if (response.status === 401) {
          res.status(401).json({ error: "Invalid credentials" });
        } else {
          res.status(500).json({ error: "Server Error" });
        }
        //console.log(response.data)
      } catch (error: any) {
        // console.log(error);
        res.status(500).json({ error: `Server Error : ${error.message}` });
      }
      break;
    case "POST":
      const dataId = req.query.dataId;
      const method = req.query.method;
      try {
        const session: any = await getIronSession(req, res, sessionOptions);
        const data = req.body;
        let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/website`;
        if (dataId) {
          apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/website/${dataId}`;
        }
        let response;
        if (method != ""){
          
          if(method == "PUT"){
            response = await axios.put(apiUrl, {
              url: data.url,
            }, {
              headers: {
                'Authorization': `Bearer ${session.token}`
              }
            });
          } else if(method == "DELETE"){
            response = await axios.delete(apiUrl,{
              headers: {
                'Authorization': `Bearer ${session.token}`
              }
            });
          } else {
            res.status(405).end(`${req.method} Not Allowed`);
          }
        } else {
          response = await axios.post(apiUrl, {
            url: data.url,
          }, {
            headers: {
              'Authorization': `Bearer ${session.token}`
            }
          });
        }
        if(response != undefined){
          if (response.status === 200) {
            res.status(200).json(response.data.data);
          } else if (response.status === 401) {
            res.status(401).json({ error: "Invalid credentials" });
          } else {
            console.log(response.data);
            res.status(500).json({ error: "Server Error" });
          }
        } else {
          res.status(405).end(`${req.method} Not Allowed`);
        }
      }
      catch (error: any) {
        console.log(error);
        res.status(500).json({ error: `Server Error : ${error.message}` });
      }
      break;
    default:
      res.status(405).end(`${req.method} Not Allowed`);
      break;
  }


}

