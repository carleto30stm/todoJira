import { db } from '@/dataBase'
import { EntrySchema,IEntry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'




type Data = 
    |{message: string}
    |IEntry[]
    |IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(req, res)
        case 'POST':
            return postEntry(req, res)
            default:
                return res.status(405).json({ message: 'Method not allowed' })
    }  
}
const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await EntrySchema.find().sort({ createdAt: 'ascending' }).lean();
    await db.disconnect();
    res.status(200).json(entries)
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description = '' } = req.body;
    const newEntry = new EntrySchema({
        description,
        createdAt: Date.now()
    })
    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect();
        return res.status(201).json(newEntry)
    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(500).json({ message: 'Something went wrong' })
    }
}