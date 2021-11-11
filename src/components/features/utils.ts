const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_v, k) => k + start);

export const generateRange = (currentPage: number, lastPage: number) => {
  let startPage = 1;
  let endPage = lastPage;
  if (lastPage - currentPage > 10) {
    startPage = currentPage > 5 ? currentPage - 5 : 1;
    endPage = currentPage > 5 ? currentPage + 4 : 10;
  } else if (lastPage > 10) {
    startPage = currentPage;
    endPage = lastPage;
  }
  return range(startPage, endPage);
};
