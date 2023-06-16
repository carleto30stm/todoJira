import { Entry } from '@/interfaces';
import { EntriesState } from './';
type EntriesActionType =
|{type:'[Entry] - Add-Entry', payload:Entry}
|{type:'[Drag] - Update-EntryStatus', payload:Entry}
|{type:'[Load] - Load-Entrys', payload:Entry[]}
export const EntriesReducer = (state:EntriesState, action:EntriesActionType): EntriesState=>{
    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries:[...state.entries, action.payload]
            }
        case '[Drag] - Update-EntryStatus':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if(entry._id === action.payload._id){
                        entry.status = action.payload.status
                        entry.description = action.payload.description
                    }
                    return entry
                })
            
            }
            case '[Load] - Load-Entrys':
                return {
                    ...state,
                    entries: [...action.payload]
                
                }
          default:
            return state;
    }
}