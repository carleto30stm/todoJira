import { UiState } from './';
type UiActionType =
|{type:'UI - Open Sidebar'}
|{type:'UI - Close Sidebar'} 
|{type:'UI - Set AddingEntry', payload:boolean} 
|{type:'UI - Set DraggingEntry', payload:boolean} 
export const uiReducer = (state:UiState, action:UiActionType)=>{
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen:true
            }

        case 'UI - Close Sidebar':
            return {
                ...state,   
                sideMenuOpen:false
            }
        case 'UI - Set AddingEntry':
            return {
                ...state,   
                isAddingEntry:action.payload
            }
        case 'UI - Set DraggingEntry':
            return {
                ...state,   
                isDraggingEntry:action.payload
            }
   
    
   default:
            return state;
    }
}