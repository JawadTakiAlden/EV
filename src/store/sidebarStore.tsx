import { create } from "zustand";

interface SidebarIStore {
  open: boolean;
  selectedId: string | undefined;
  handelClose: () => void;
  handelOpen: () => void;
  handelSwitch: () => void;
  setSelected: (id: string) => void;
}

export const useSidebar = create<SidebarIStore>((set) => ({
  open: false,
  selectedId: undefined,
  handelClose: () => {
    set({ open: false });
  },

  handelOpen: () => {
    set({ open: true });
  },

  handelSwitch: () => {
    set((state) => ({ open: !state.open }));
  },

  setSelected: (id) => {
    set({ selectedId: id });
  },
}));
