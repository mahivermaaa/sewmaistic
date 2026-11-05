"use client";

import React, { createContext, useContext, useMemo } from "react";
import { Product } from "@/types/sewdarlin";

interface CatalogueContextType {
  products: Product[];
  newArrivals: Product[];
  fanFavourites: Product[];
  thriftStore: Product[];
}

const CatalogueContext = createContext<CatalogueContextType | undefined>(undefined);

export function CatalogueProvider({ products, children }: { products: Product[]; children: React.ReactNode }) {
  const value = useMemo<CatalogueContextType>(
    () => ({
      products,
      newArrivals: products.filter((p) => p.isNewArrival),
      fanFavourites: products.filter((p) => p.isFanFavourite),
      thriftStore: products.filter((p) => p.category === "Thrift Store"),
    }),
    [products]
  );
  return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>;
}

export function useCatalogue() {
  const context = useContext(CatalogueContext);
  if (!context) throw new Error("useCatalogue must be used within a CatalogueProvider");
  return context;
}
