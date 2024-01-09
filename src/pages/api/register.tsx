import { getIronSession } from 'iron-session';
import { sessionOptions } from '../../utils/withSession';
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            try {
                const { name, email, password } = req.body;

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                    name: name,
                    email: email,
                    password: password,
                });
                if (response.status === 200) {

                    const json = await response.data.data;
                    const session: any = await getIronSession(req, res, sessionOptions);
                    session.token = json.token;
                    await session.save();

                    res.status(200).json(response.data.data.token);
                } else {
                    res.status(response.status).json({ error: response.data.message ?? response.data.error });

                }
            } catch (error: any) {
                const data = error.response.data;
                res.status(500).json({ error: data.message ?? data.error });
            }




            break;
        default:
            res.status(405).end(`${req.method} Not Allowed`);
            break;
    }


}

