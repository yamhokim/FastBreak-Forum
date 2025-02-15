import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PagePagination = ({
  numPages,
  handleSetPage,
  page,
  increasePage,
  decreasePage,
}) => {
  const numbers = Array.from({ length: numPages }, (_, i) => i + 1);
  console.log(numbers);
  const firstPageNum = numbers[0];
  const lastPageNum = numbers[numbers.length - 1];

  return (
    <Pagination className="my-6 dark:text-white">
      <PaginationContent>
        {page === firstPageNum || (
          <PaginationItem onClick={decreasePage}>
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
          <PaginationItem onClick={increasePage}>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
