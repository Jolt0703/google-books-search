const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_v, k) => k + start);

export const generateRange = (currentPage: number, lastPage: number) => {
  let startPage = 1;
  let endPage = lastPage;
  if (lastPage - currentPage > 10) {
    startPage = currentPage > 5 ? currentPage - 3 : 1;
    endPage = currentPage > 5 ? currentPage + 3 : 7;
  } else if (lastPage > 10) {
    startPage = currentPage > 5 ? currentPage - 3 : currentPage;
    endPage = lastPage - currentPage > 3 ? currentPage + 3 : lastPage;
  }
  return range(startPage, endPage);
};
