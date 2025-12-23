import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants/index.js";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,

    nextZIndex: INITIAL_Z_INDEX + 1,

    // 🔹 Open window
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;

        state.nextZIndex++;
      }),

    // 🔹 Close window
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    // 🔹 Bring window to front
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        if (!win) return;

        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),
  }))
);

export default useWindowStore;
