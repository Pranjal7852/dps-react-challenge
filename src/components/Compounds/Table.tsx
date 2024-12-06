import { useState } from "react";
import { useUserContext } from "@/Context/UserContext";
import PaginationComponent from "../Atoms/PaginationComponent";
import { Skeleton } from "@/components/ui/skeleton";
import userImage from "@/assets/fallback_userImage.png";
import { useTheme } from "@/Context/ThemeContext";
const SkeletonRow = ({ columns }: { columns: number }) => (
  <tr className="border border-gray-300">
    {[...Array(columns)].map((_, index) => (
      <td key={index} className="border border-gray-300 px-4 py-2">
        <Skeleton className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

const Table = () => {
  const { filteredData, oldestUsers, highlightOldest, isLoading, mode } =
    useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { themeSettings } = useTheme();
  const highLightColour =
    themeSettings.theme === "dark" ? "bg-blue-900" : "bg-blue-100";
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const isOldestUser = (userId: number) =>
    oldestUsers.some((oldestUser) => oldestUser.id === userId);

  const columnHeaders =
    mode === "normal"
      ? ["Name", "City", "Birthday"]
      : [
          "Sno",
          "Picture",
          "Name",
          "City",
          "Birthday",
          "Age",
          "Phone",
          "Role",
          "Job Title",
        ];

  return (
    <div className="flex gap-4 flex-col">
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="text-center">
            {columnHeaders.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? [...Array(itemsPerPage)].map((_, index) => (
                <SkeletonRow key={index} columns={columnHeaders.length} />
              ))
            : currentPageData.map((user, index) => (
                <tr
                  key={index}
                  className={
                    isOldestUser(user.id) && highlightOldest
                      ? highLightColour
                      : ""
                  }
                >
                  {mode === "detail" && (
                    <>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={user.image || userImage}
                          alt="Rounded avatar"
                        ></img>
                      </td>
                    </>
                  )}
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.city}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.birthday}
                  </td>
                  {mode === "detail" && (
                    <>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.age}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.phone}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.role}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {user.title}
                      </td>
                    </>
                  )}
                </tr>
              ))}
        </tbody>
      </table>

      {!isLoading && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default Table;
