"use client";

import { useContext, useEffect, useState } from "react";
import CharacterCard from "./components/CharacterCard";
import CharacterTable from "./components/CharacterTable";
import { getAllCharacters } from "../services/api";
import FilterWrapper from "./components/Filter";
import { AppContext } from "@/context";
import Loading from "./components/Loading";
import type { Character } from "./components/CharacterCard";

export default function Home() {
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const { filteredData, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (filteredData.length > 0) {
          setCharacterData(filteredData);
          console.log(filteredData);
        } else {
          const data = await getAllCharacters();
          if (data && data.length > 0) {
            setCharacterData(data);
          } else {
            setCharacterData([]);
          }
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
        setCharacterData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filteredData, setLoading]);

  return (
    <div className="items-center justify-center">
      <FilterWrapper />
      {loading ? <Loading /> : <CharacterTable data={characterData} />}
      <CharacterCard />
    </div>
  );
}
