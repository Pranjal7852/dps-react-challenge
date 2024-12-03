import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/Context/UserContext";

type Props = {
  placeholder: string;
};

const SearchComponent = (props: Props) => {
  const { filterByName, filteredData } = useUserContext();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Filter the data when search term changes
    filterByName(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("i got  cliekced", e.target.value);
    setSearchTerm(e.target.value); // Update the search term
  };

  return (
    <Input
      className="w-1/4 cursor-text"
      type="search"
      placeholder={props.placeholder}
      value={searchTerm}
      onChange={handleSearchChange} // Update search term when typing
    />
  );
};

export default SearchComponent;
