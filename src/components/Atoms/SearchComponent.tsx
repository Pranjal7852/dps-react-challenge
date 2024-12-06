import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/Context/UserContext";

type Props = {
  placeholder: string;
};

const SearchComponent = (props: Props) => {
  const { filterByName } = useUserContext();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      filterByName(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Input
      className="w-1/4 cursor-text bg-white"
      type="search"
      placeholder={props.placeholder}
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchComponent;
