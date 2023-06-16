import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '@/dataBase';
import EntryModel from '@/models/EntrySchema';

type Data = {
    message: string
}

export default async function seed(req: NextApiRequest, res: NextApiResponse<Data>) {

      
        if ( process.env.NODE_ENV === 'production' ) {
            return res.status(401).json({ message: 'Unauthorized' })  
        }
    try {
        await db.connect();
        await EntryModel.deleteMany();
        console.log(seedData.entries);
        await EntryModel.insertMany(seedData.entries)
        console.log('correcto');    
        await db.disconnect();
    
        res.status(200).json({ message: 'Proceso realizado correctamente' }) 
    } catch (error) {
        console.log(error);
        
    }
    
}
