"use client";
import { Brand, Category } from "@prisma/client";
import { ReactNode, createContext, useContext, useState } from "react";

export type BrandWithCategory = Brand & {
  categories: Category[];
};
type TBrandContext = {
  brand: BrandWithCategory;
  setBrand: (brand: BrandWithCategory) => void;

  selectedRowBrand: BrandWithCategory | undefined;
  setSelectedRowBrand: (brand: BrandWithCategory) => unknown;
};

type BrandProviderProps = {
  children: ReactNode;
};
const BrandContext = createContext({} as TBrandContext);

export function useBrand() {
  return useContext(BrandContext);
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [brand, setBrand] = useState<BrandWithCategory>();

  const [selectedRowBrand, setSelectedRowBrand] = useState<
    BrandWithCategory | undefined
  >(undefined);

  return (
    <BrandContext.Provider
      value={{
        brand,
        setBrand,
        selectedRowBrand,
        setSelectedRowBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}
