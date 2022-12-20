// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
} | {
    error: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.query.id) {
        const resp = await axios.get(`https://www.googleapis.com/books/v1/volumes/${req.query.id}`);
        res.send(resp.data);
    } else {
        res.status(400).json({ error: "Please provide a book id" });
    }
}
