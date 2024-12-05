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
  dataSaver: boolean;
  toggleDataSaver: (value: boolean) => void;
  offlineMode: boolean;
  toggleOfflineMode: (value: boolean) => void;
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
  const [dataSaver, setDataSaver] = useState<boolean>(true);
  const [offlineMode, setOfflineMode] = useState<boolean>(true);

  const fetchData = async () => {
    console.log("fetch data");
    const savedDataSaver = localStorage.getItem("dataSaver") === "true";
    const savedOfflineMode = localStorage.getItem("offlineMode") === "true";
    // Use the latest states for offlineMode and dataSaver
    if (!navigator.onLine) {
      if (savedOfflineMode) {
        const localData = localStorage.getItem("userData");
        const expiration = localStorage.getItem("dataExpiration");
        if (localData && expiration && Date.now() < parseInt(expiration)) {
          console.log("fetched from local");
          setData(JSON.parse(localData));
          setIsLoading(false);
          return;
        }
      }
    } else {
      if (savedDataSaver) {
        console.log("ftechinfg from seesion");
        const sessionData = sessionStorage.getItem("userData");
        if (sessionData) {
          setData(JSON.parse(sessionData));
          setIsLoading(false);
          return;
        }
      }
    }

    // Fetch data from API if not in offline mode or data saver
    setIsLoading(true);
    try {
      console.log("making API call");
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

      // Save data for offlineMode and dataSaver
      handleDataSaver(processedData);
      handleOfflineMode(processedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load saved settings from localStorage
    const savedDataSaver = localStorage.getItem("dataSaver") === "true";
    const savedOfflineMode = localStorage.getItem("offlineMode") === "true";

    setDataSaver(savedDataSaver);
    setOfflineMode(savedOfflineMode);

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

  const handleDataSaver = (data: User[]) => {
    try {
      sessionStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to session storage:", error);
    }
  };

  const handleOfflineMode = (data: User[]) => {
    try {
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("dataExpiration", expirationTime.toString());
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  };

  const clearDataSaverStorage = () => {
    try {
      sessionStorage.removeItem("userData");
    } catch (error) {
      console.error("Error clearing session storage:", error);
    }
  };

  const clearOfflineStorage = () => {
    try {
      localStorage.removeItem("userData");
      localStorage.removeItem("dataExpiration");
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };

  const toggleOfflineMode = () => {
    setOfflineMode((prev) => {
      const newMode = !prev;

      try {
        localStorage.setItem("offlineMode", newMode.toString());
        handleOfflineMode(data);

        if (prev) {
          clearOfflineStorage();
        }
      } catch (error) {
        console.error("Error toggling offline mode:", error);
      }
      console.log("i got toggle", newMode);
      return newMode;
    });
  };

  const toggleDataSaver = () => {
    setDataSaver((prev) => {
      const newMode = !prev;

      try {
        localStorage.setItem("dataSaver", newMode.toString());
        handleDataSaver(data);
        if (prev) {
          clearDataSaverStorage();
        }
      } catch (error) {
        console.error("Error toggling data saver:", error);
      }

      return newMode;
    });
  };

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
        offlineMode,
        dataSaver,
        toggleOfflineMode,
        toggleDataSaver,
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
