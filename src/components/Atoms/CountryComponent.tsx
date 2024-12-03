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

function processData(data: { address?: { city?: string } }[]): string[] {
  const city: string[] = [];
  data.forEach((row) => {
    if (row?.address?.city) {
      city.push(row.address.city);
    }
  });
  return city;
}
const CountryComponent = () => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("https://dummyjson.com/users");
        const city = processData(response.data.users);
        setCities(city);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Select>
      <SelectTrigger className="w-1/4">
        <SelectValue placeholder="Select City" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>City</SelectLabel>
          {/* Dynamically render SelectItems based on cities */}
          {cities.length > 0 ? (
            cities.map((city, index) => (
              <SelectItem key={index} value={city}>
                {city}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="No cities available">
              No cities available
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CountryComponent;
