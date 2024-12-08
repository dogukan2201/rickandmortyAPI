"use client";

import React, { useState, useContext } from "react";
import { AppContext } from "@/context/";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { filteredCharacter } from "../../services/api";
import { toast } from "react-hot-toast";

const Filter = () => {
  const { setFilteredData, setLoading } = useContext(AppContext);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    try {
      const data = await filteredCharacter(queryParams.toString());

      if (data && data.length > 0) {
        toast.success("Filters applied successfully!");
        setFilteredData(data);
      } else {
        toast.error("No data found for the selected filters.");
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
      toast.error("Failed to apply filters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setLoading(true);
    setFilters({
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
    });
    setLoading(false);
  };

  return (
    <div className="space-y-4 p-4 bg-background border container mx-auto py-10 bg-gray-100 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
        Filter Characters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Character Name
          </Label>
          <Input
            id="name"
            placeholder="Name"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </Label>
          <Select
            value={filters.status || "any"}
            onValueChange={(value) =>
              handleSelectChange("status", value === "any" ? "" : value)
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="alive">Alive</SelectItem>
              <SelectItem value="dead">Dead</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="species"
            className="text-sm font-medium text-gray-700"
          >
            Species
          </Label>
          <Input
            id="species"
            placeholder="Species"
            name="species"
            value={filters.species}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Type
          </Label>
          <Input
            id="type"
            placeholder="Type"
            name="type"
            value={filters.type}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender
          </Label>
          <Select
            value={filters.gender || "any"}
            onValueChange={(value) =>
              handleSelectChange("gender", value === "any" ? "" : value)
            }
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="genderless">Genderless</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={clearFilters}>
          Clear
        </Button>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
};

export default Filter;
