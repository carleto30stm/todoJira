import {  FC, useReducer, ReactNode,  useEffect } from 'react';
import {useSnackbar} from 'notistack'
import { EntriesContext, EntriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

export interface EntriesState {
  entries: Entry[];
}

const EntriesInitialState: EntriesState ={
  entries: []
}

export const EntriesContextProvider: FC<{children: ReactNode}> = ({children}) => {

   const [state, dispatch] = useReducer(EntriesReducer, EntriesInitialState)
   const { enqueueSnackbar } = useSnackbar();

   const addNewEntry = async(description: string) => {
    try {
      const {data} = await entriesApi.post<Entry>('/entries', {description})
      dispatch({type: '[Entry] - Add-Entry', payload: data})
    }  
     catch (error) {
      console.log(error);
      
    }
     
   }

   const entryUpdate = async({_id,description,status}: Entry, showSnackBar: boolean = false) => {
    try {
      const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description,status})
      dispatch({type: '[Drag] - Update-EntryStatus', payload: data})
      if (showSnackBar) {
        enqueueSnackbar('Entry Added Successfully', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        })
      }    
      
    } catch (error) {
      console.log(error);
      
    }
    };
    const refresEntries = async( ) => { 
      try {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: '[Load] - Load-Entrys', payload: data})     
      } catch (error) {
        console.log(error);       
      } 
    }
   
    useEffect (() => {
    refresEntries();
    }, [])
    
  return (
   <EntriesContext.Provider value={{
     ...state,
     //methods
     
    addNewEntry,
    entryUpdate
}}>
     {children}
    </EntriesContext.Provider>
  );
};