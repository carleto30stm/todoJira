import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
    entries: Entry[];
    addNewEntry: (description: string) => void;
    entryUpdate: (entry: Entry, showSnackbar?: boolean) => void;
}


export const EntriesContext = createContext({} as ContextProps);    