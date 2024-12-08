import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppContext } from "@/context";
import { getCharacterDetails } from "../../services/api";
import toast from "react-hot-toast";
import { ChevronUp } from "lucide-react";

// Character arayüzü tanımlandı
export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
  gender: string;
  location: { name: string };
  origin: { name: string };
  created: string;
}

const CharacterCard: React.FC = () => {
  const { selectedUserId } = useContext(AppContext); // Uygulamanın global statetinden seçili karakterin id alındı
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (selectedUserId !== null) {
        try {
          const data = await getCharacterDetails(selectedUserId); // APIden karakter detaylarını çekildı
          setCharacter(data);
          toast.success("Scroll down to see the character details", {
            icon: "⬇️",
            duration: 3000,
            position: "top-center",
          });
        } catch (error) {
          console.error("Error fetching character details:", error);
          toast.error("Error fetching character details."); // Hata durumu ekrana yazdırıldı
        }
      }
    };
    fetchCharacterDetails();
  }, [selectedUserId]); // selectedUserId değiştiğinde karakterin detaylarını APIden alındı

  if (!character) {
    //Row seçilmediğinde seçim yapılmasın için kullanıcıya mesaj gösterildi
    return (
      <div className="flex justify-center items-center text-center text-gray-600 text-xl mt-8 mb-8">
        <ChevronUp />
        Select a table row to see character details
        <ChevronUp />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-background border  container mx-auto py-10 bg-gray-100 rounded-lg shadow-lg mt-4 mb-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
        Character Detail
      </h2>
      <Card className="w-full max-w-2xl mx-auto my-8 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col md:flex-row">
          <CardHeader className="p-0 md:w-1/2">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardContent className="p-6 md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
              {character.name}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <strong className="text-gray-600">Status:</strong>
                <Badge
                  variant={
                    character.status === "Alive"
                      ? "default"
                      : character.status === "Dead"
                      ? "destructive"
                      : "secondary"
                  }
                  className="text-sm font-medium"
                >
                  {character.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <strong className="text-gray-600">Species:</strong>
                <span>{character.species}</span>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <strong className="text-gray-600">Gender:</strong>
                <span>{character.gender}</span>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <strong className="text-gray-600">Location:</strong>
                <span className="text-sm text-right">
                  {character.location.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <strong className="text-gray-600">Origin:</strong>
                <span className="text-sm text-right">
                  {character.origin.name}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-800">
                <strong className="text-gray-600">Created:</strong>
                <span className="text-sm text-right">
                  {new Date(character.created).toLocaleDateString("en-GB", {
                    // Karakterin oluşturuldugunu tarih daha uygun bir formata çevrildi
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default CharacterCard;
