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
    const timer = setTimeout(() => {
      filterByName(searchTerm);
      console.log("debounce test");
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      className="w-1/4 cursor-text"
      type="search"
      placeholder={props.placeholder}
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchComponent;
