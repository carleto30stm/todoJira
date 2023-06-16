import { db } from '@/dataBase';
import { Entry } from '@/interfaces';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
|{   message: string}
|Entry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID' })
    }
    switch (req.method) {
        case 'PUT': 
        return updateEntries(req, res);

        case 'GET': 
         return getEntries(req, res);  

        default:
            return res.status(400).json({ message: 'Invalid method' })    
        }
}

const updateEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    try {
        await db.connect();
        
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to database' })
    }
    
    try {
        const { description, status } = req.body;
        const updatedEntry = await mongoose.model('Entry').findByIdAndUpdate(id, {
            description,
            status
        }, {runValidators: true, new: true });
        db.disconnect();
        res.status(200).json(updatedEntry);
        
    } catch (error:any) {
        console.log({error});
        db.disconnect();
        res.status(500).json({ message: error.errors})
    }
}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();
     const entryById = await mongoose.model('Entry').findById(id)
     await  db.disconnect();
     if (!entryById) {
        return res.status(404).json({ message: 'Entry not found' })
        }
     res.status(200).json(entryById);  
}