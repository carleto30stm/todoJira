import { Entry } from "@/interfaces";
interface Seed {
    entries: SeedEntry[]
}

// interface SeedEntry extends Omit<Entry, '_id'>{

// } 
interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: Seed = {
    entries:[
        {
            description: 'Pendiente: lorem ipsum dolor sit amet, e, nisl ut viverra tincidunt',
            status: 'pending',
            createdAt:  Date.now(),
        },
        {
            description: 'Pendiente: lorem ipsum dolor sit amet, e, nisl ut viverra tincidunt',
            status: 'in-progress',
            createdAt:  Date.now(), 
        },
        {
            description: 'Pendiente: lorem ipsum dolor sit amet, e, nisl ut viverra tincidunt',
            status: 'finished',
            createdAt:  Date.now(), 
        }
]}
