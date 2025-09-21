import leftIcon from "../assets/icons/chevron-left.svg";
import rightIcon from "../assets/icons/chevron-right.svg";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages === 0) return null;

  const pageNumbers = [];

  // თავიდან მინდა ჩანდეს პირველი ორი გვერდის რიცხვები (1, 2), ასევე ბოლო 2 გვერდის (9, 10) და 3 გვერდი currentPage-თან ახლოს რაც არის. მაგალითად, თუ currentPage=5, გამოვაჩენ: 1 2 ... 4 5 6 ... 9 10

  // დამხმარე გვერდის ნომრის დასამატებლად, თუ უკვე არ არის მასივი
  const addPage = (page) => {
    if (!pageNumbers.includes(page) && page >= 1 && page <= totalPages) {
      pageNumbers.push(page);
    }
  };

  // პირველი 2 გვერდის
  addPage(1);
  addPage(2);

  // currentPage-ის წინა და მომდევნოების დამატება
  addPage(currentPage - 1);
  addPage(currentPage);
  addPage(currentPage + 1);

  // ბოლო 2 გვერდის
  addPage(totalPages - 1);
  addPage(totalPages);

  // სორტირება უნიკალური ღილაკების განლაგებისთვის
  pageNumbers.sort((a, b) => a - b);

  //  " ... "
  const items = [];

  for (let i = 0; i < pageNumbers.length; i++) {
    items.push(pageNumbers[i]);

    // ელიფსის ჩამატება
    if (i < pageNumbers.length - 1 && pageNumbers[i + 1] > pageNumbers[i] + 1) {
      items.push("ellipsis-" + i);
    }
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-[90px] select-none">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={` ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <img src={leftIcon} alt="left icon" />
      </button>

      {/* Page numbers + ellipsis */}
      {items.map((item, index) =>
        typeof item === "string" ? (
          <span
            key={item}
            className="w-[32px] h-[32px] flex justify-center items-center leading-[100%] text-[#212B3699] select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`w-[32px] h-[32px] flex justify-center items-center font-medium text-[14px] leading-[20px] tracking-[0] border border-solid border-[#F8F6F7]  rounded-[4px] ${
              item === currentPage
                ? " text-primary border-primary"
                : "cursor-pointer text-[#212B3699]"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <img src={rightIcon} alt="right icon" />
      </button>
    </nav>
  );
}

export default Pagination;
