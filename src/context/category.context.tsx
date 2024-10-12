"use client";
import { Category } from "@prisma/client";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

type TCategoryContext = {
  category: Category;
  setCategory: (category: Category) => void;

  selectedRowCategory: Category | undefined;
  setSelectedRowCategory: (category: Category) => unknown;
};

type CategoryProviderProps = {
  children: ReactNode;
};
const CategoryContext = createContext({} as TCategoryContext);

export function useCategory() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [category, setCategory] = useState<Category>();

  const [selectedRowCategory, setSelectedRowCategory] = useState<
    Category | undefined
  >(undefined);

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        selectedRowCategory,
        setSelectedRowCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
