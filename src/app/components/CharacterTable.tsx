"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { AppContext } from "@/context/";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface CharacterDataProps {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
}

interface CharacterTableProps {
  data: CharacterDataProps[];
}

type SortKey = keyof CharacterDataProps;

const CharacterTable: React.FC<CharacterTableProps> = ({ data }) => {
  const { setSelectedUserId, setLoading } = useContext(AppContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(40);
  const [sortConfig, setSortConfig] = React.useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const sortedData = React.useMemo(() => {
    // Data'nın kopyasını oluşturuldu  orijinal veri setini bozmamak için
    const sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // a[sortConfig.key] ile b[sortConfig.key] karşılaştırıldı
        if (a[sortConfig.key] < b[sortConfig.key]) {
          // Sıralama yönüne göre -1 (artan sıralama) veya 1 (azalan sıralama) döndürüldü
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    // Sıralanmış veri setini döndürüldü
    return sortableItems;
  }, [data, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage, // Başlangıç indexini hesaplıyoruz (sayfa - 1) * sayfa başına öğe sayısı
    currentPage * itemsPerPage // Bitiş indexini hesaplıyoruz (sayfa * sayfa başına öğe sayısı)
  );

  const requestSort = (key: SortKey) => {
    setLoading(true);
    let direction: "ascending" | "descending" = "ascending"; // Varsayılan sıralama yönü artan olarak ayarlandı
    if (
      sortConfig &&
      sortConfig.key === key && // Şu anki sıralama aynı anahtar üzerinden mi?
      sortConfig.direction === "ascending" // Yön şu anda artan mı?
    ) {
      direction = "descending"; // Evetse yön azalan olarak değiştirildi
    }
    setSortConfig({ key, direction }); // Yeni sıralama konfigürasyonunu ayarlandı
    setLoading(false);
  };

  return (
    <div className="space-y-4 p-4 bg-background border container mx-auto py-10 bg-gray-100 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
        Characters Table
      </h2>

      <div className="mb-6 flex items-center space-x-4 bg-white p-4 rounded-md shadow">
        <strong className="text-gray-700">Characters Per Page:</strong>
        <Input
          type="number"
          value={itemsPerPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
              setItemsPerPage(value);
            }
          }}
          className="w-20 border-gray-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="font-bold text-gray-700">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("id")}
                  className="hover:bg-gray-300"
                >
                  ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-bold text-gray-700">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("name")}
                  className="hover:bg-gray-300"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-bold text-gray-700">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("status")}
                  className="hover:bg-gray-300"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-bold text-gray-700 text-right">
                <Button
                  variant="ghost"
                  onClick={() => requestSort("species")}
                  className="hover:bg-gray-300"
                >
                  Species
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => {
                  if (item.id) {
                    setSelectedUserId(item.id);
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    });
                  }
                }}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      item.status === "Alive"
                        ? "bg-green-200 text-green-800"
                        : item.status === "Dead"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">{item.species}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Scrool to left see more</TableCell>
              <TableCell className="text-right">
                Scrool to right see more
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <Pagination>
        <PaginationContent className="overflow-x-auto mx-8">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.max(prev - 1, 1));
              }}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            />
          </PaginationItem>
          <div className="inline-flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                  className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 ${
                    currentPage === index + 1 ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </div>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              }}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CharacterTable;
