import React, { useState } from "react";
import { useUserContext } from "@/Context/UserContext";
import PaginationComponent from "../Atoms/PaginationComponent";

const Table = () => {
  const { filteredData, oldestUsers, highlightOldest } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isOldestUser = (userId: number) => {
    return oldestUsers.some((oldestUser) => oldestUser.id === userId);
  };
  return (
    <div className="flex gap-4 flex-col">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Birthday</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((user, index) => (
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

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default Table;
