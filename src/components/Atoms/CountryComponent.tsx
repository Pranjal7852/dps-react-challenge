import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/Context/UserContext";

const CountryComponent: React.FC = () => {
  const { data, filterByCity, filteredData } = useUserContext();
  const [selectedCity, setSelectedCity] = useState<string>("All");

  useEffect(() => {
    filterByCity(selectedCity);
  }, [selectedCity, filteredData]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const cities: string[] = ["All", ...new Set(data.map((user) => user.city))];

  return (
    <Select value={selectedCity} onValueChange={handleCitySelect}>
      <SelectTrigger className="w-1/4 bg-white">
        <SelectValue placeholder="Select City">{selectedCity}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>City</SelectLabel>
          {cities.map((city, index) => (
            <SelectItem key={index} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CountryComponent;
