"use client";

import React, { createContext, useState, ReactNode } from "react";
import type { Character } from "@/app/components/CharacterCard";

interface AppContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
  filteredData: Character[];
  setFilteredData: (data: Character[]) => void;
}

const defaultValue: AppContextType = {
  //Global state kullanılacak değişkenler default değerleri
  loading: false,
  setLoading: () => {},
  selectedUserId: null,
  setSelectedUserId: () => {},
  filteredData: [],
  setFilteredData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    //AppContexte state ve callbackları ile erişilebilir hale getiriliyor provider yapısı ile
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        selectedUserId,
        setSelectedUserId,
        filteredData,
        setFilteredData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
