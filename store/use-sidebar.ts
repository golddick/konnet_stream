import {create} from 'zustand'

interface sidebarStore {
    collapsed: boolean;
    onExpand:() => void;
    onCollapse: () => void;
}

export const useSidebar = create<sidebarStore>((set) => ({
    collapsed:false,
    onExpand: () => set({collapsed:false}),
    onCollapse: () => set({collapsed:true})
}))