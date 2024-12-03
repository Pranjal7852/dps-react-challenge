import React from "react";
import { useUserContext } from "@/Context/UserContext";

const Table = () => {
  const { filteredData, oldestUsers, highlightOldest } = useUserContext();

  const isOldestUser = (userId: number) => {
    return oldestUsers.some((oldestUser) => oldestUser.id === userId);
  };
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100 text-center">
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">City</th>
          <th className="border border-gray-300 px-4 py-2">Birthday</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((user, index) => (
          <tr
            key={index}
            className={
              isOldestUser(user.id) && highlightOldest
                ? "bg-[#878dfb]"
                : index % 2 === 0
                ? "bg-blue-100"
                : ""
            }
          >
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.city}</td>
            <td className="border border-gray-300 px-4 py-2">
              {user.birthday}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
