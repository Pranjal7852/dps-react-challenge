import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

// Define the types for user data
interface User {
  id: number;
  name: string;
  city: string;
  birthday: string;
}

interface UserContextType {
  data: User[]; // The full dataset of users
  filteredData: User[]; // The filtered dataset
  filterByName: (searchTerm: string) => void; // Function to filter data by name
  filterByCity: (selectedCity: string) => void; // Function to filter data by city
  highlightOldest: boolean; // Add this
  toggleHighlightOldest: () => void; // Add this
  oldestUsers: User[]; // Add this
}

// Create the context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Define the props type for the provider
interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [highlightOldest, setHighlightOldest] = useState<boolean>(false);

  // Fetch user data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://dummyjson.com/users");
      const processedData = response.data.users.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        city: user.address.city,
        birthday: user.birthDate,
      }));
      setData(processedData);
      setFilteredData(processedData);
    };
    fetchData();
  }, []);

  // Apply combined filtering logic
  useEffect(() => {
    const filtered = data.filter((user) => {
      const matchesName =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === "All" || user.city === selectedCity;

      return matchesName && matchesCity;
    });
    setFilteredData(filtered);
  }, [data, searchTerm, selectedCity]);

  // Functions to set filters
  const filterByName = (search: string) => {
    setSearchTerm(search);
  };

  const filterByCity = (city: string) => {
    setSelectedCity(city);
  };

  const toggleHighlightOldest = () => {
    setHighlightOldest((prev) => !prev);
  };

  const getOldestUsersByCity = () => {
    if (!highlightOldest) return [];
    const oldestUsers: Record<string, User> = {};
    data.forEach((user) => {
      const userBirthday = new Date(user.birthday);
      if (
        !oldestUsers[user.city] ||
        userBirthday < new Date(oldestUsers[user.city].birthday)
      ) {
        oldestUsers[user.city] = user;
      }
    });
    return Object.values(oldestUsers);
  };

  const oldestUsers = getOldestUsersByCity();

  return (
    <UserContext.Provider
      value={{
        data,
        filteredData,
        filterByName,
        filterByCity,
        highlightOldest,
        toggleHighlightOldest,
        oldestUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
