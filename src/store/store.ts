import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create (
  persist(
    (set) => {
      return {
        fromDate: "",
        toDate: "",
        selectedCategory: "",
        setSelectedCategory: (value) =>
          set(() => ({ selectedCategory: value })),
        selectedSource: "",
        setSelectedSource: (value) => set(() => ({ selectedSource: value })),
        setFromDate: (value) => set(() => ({ fromDate: value })),
        setToDate: (value) => set(() => ({ toDate: value })),
        SourceList: null,
        CategoryList: null,
        AuthorList: null,
        addToFavoriteList: (type: string, id: string) =>
          set(
            produce((state) => {
              if (type == "Categories") {
                {
                  state.CategoryList = { id: id };
                }
              } else if (type == "Sources") {
                state.SourceList = { id: id };
              } else if (type == "Authors") {
                state.AuthorList = { id: id };
              }
            })
          )
      };
    },
    {
      name: "news-app",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
