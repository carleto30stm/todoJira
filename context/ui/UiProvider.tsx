import {  FC, useReducer, ReactNode } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggingEntry: boolean;
  
}

const UiInitialState: UiState ={
  sideMenuOpen: false,
  isAddingEntry: false,
  isDraggingEntry: false

}

export const UiContextProvider: FC<{children: ReactNode}> = ({children}) => {
   const [state, dispatch] = useReducer(uiReducer, UiInitialState)
   const openSideMenu = () => {
    dispatch({type: 'UI - Open Sidebar'})
   }
   const closeSideMenu = () => {
    dispatch({type: 'UI - Close Sidebar'})
   }
   const toggleAdding = (isAddingEntry: boolean) => {
    dispatch({type: 'UI - Set AddingEntry', payload: isAddingEntry})
   
   }
   const draggingEntry = (isDraggingEntry: boolean) => {
    dispatch({type: 'UI - Set DraggingEntry', payload: isDraggingEntry})
   }
   ;

  return (
   <UiContext.Provider
      value={{
        ...state,
        // Methos 
        openSideMenu,
        closeSideMenu,
       toggleAdding,
       draggingEntry

        }}>
     {children}
    </UiContext.Provider>
  );
};

