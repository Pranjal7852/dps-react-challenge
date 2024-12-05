import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  city: string;
  birthday: string;
  [key: string]: unknown;
  age: number;
  phone: string;
  image: string;
  role: string;
  title: string;
}

interface UserContextType {
  data: User[];
  filteredData: User[];
  filterByName: (searchTerm: string) => void;
  filterByCity: (selectedCity: string) => void;
  toggleMode: () => void;
  highlightOldest: boolean;
  toggleHighlightOldest: () => void;
  oldestUsers: User[];
  isLoading: boolean;
  mode: "normal" | "detail";
}

// Create the User data context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [highlightOldest, setHighlightOldest] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<"normal" | "detail">("normal");

  // Fetch user data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/users");
        const processedData = response.data.users.map((user: any) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          city: user.address.city,
          birthday: user.birthDate,
          age: user.age,
          phone: user.phone,
          image: user.image,
          eyeColor: user.eyeColor,
          role: user.role,
          jobTitle: user.company.title,
        }));
        setData(processedData);
        // setFilteredData(processedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // FILTER LOGIC HERE
  useEffect(() => {
    const filtered = data.filter((user) => {
      const matchesName =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === "All" || user.city === selectedCity;

      return matchesName && matchesCity;
    });
    console.log("test", mode, filtered);
    const processedFilteredData =
      mode === "detail"
        ? filtered.map((user) => ({
            id: user.id,
            name: user.name,
            city: user.city,
            birthday: user.birthday,
            age: user.age,
            phone: user.phone,
            image: user.image,
            role: user.role,
            title: user.jobTitle,
          }))
        : filtered;

    setFilteredData(processedFilteredData);
  }, [data, searchTerm, selectedCity, mode]);

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
  const toggleMode = () => {
    console.log("i got toggle");
    setMode((prevMode) => (prevMode === "normal" ? "detail" : "normal"));
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
        toggleMode,
        isLoading,
        mode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
