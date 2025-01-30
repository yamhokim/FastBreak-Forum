import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PagePagination = ({ numPages, handleSetPage, page }) => {
  const numbers = Array.from({ length: numPages }, (_, i) => i + 1);
  const firstPageNum = numbers[0];
  const lastPageNum = numbers[numbers.length - 1];

  return (
    <Pagination className="my-6 dark:text-white">
      <PaginationContent>
        {page === firstPageNum || (
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}

        {numbers.map((num) => (
          <PaginationItem key={num} onClick={() => handleSetPage(num)}>
            {num === page ? (
              <PaginationLink href="#" isActive>
                {num}
              </PaginationLink>
            ) : (
              <PaginationLink href="#">{num}</PaginationLink>
            )}
          </PaginationItem>
        ))}

        {page === lastPageNum || (
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
