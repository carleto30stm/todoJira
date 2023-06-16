import { createContext } from 'react';

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    toggleAdding: (isAdding: boolean) => void;
    draggingEntry: (isDraggingEntry: boolean) => void;
}


export const UiContext = createContext({} as ContextProps);