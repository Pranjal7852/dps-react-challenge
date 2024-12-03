import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPrevious();
            }}
          />
        </PaginationItem>

        {/* Pagination Links */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(pageNumber);
                }}
                isActive={pageNumber === currentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNext();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
