import { create } from "zustand";

interface ThemeStore {
  mode: "dark" | "light";
  changeMode: () => void;
}

let defaultMode = localStorage.getItem("fitness_mode") as "dark" | "light";

defaultMode = defaultMode || "dark";

export const useTheme = create<ThemeStore>((set, get) => ({
  mode: defaultMode,
  changeMode: () => {
    set((state) => ({ mode: state.mode === "dark" ? "light" : "dark" }));
  },
}));
