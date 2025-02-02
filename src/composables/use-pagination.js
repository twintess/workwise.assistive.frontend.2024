import { ref } from 'vue';

export const usePagination = (dataLength, itemsPerPage = 10) => {
  const currentPageNumber = ref(1);
  const totalPagesCount = ref(Math.ceil(dataLength / itemsPerPage));

  const handleGoToPage = (pageNumber, relative = true) => {
    if (relative) {
      if (pageNumber == -1 && currentPageNumber.value > 1) {
        currentPageNumber.value--;
      } else if (
        pageNumber == 1 &&
        currentPageNumber.value < totalPagesCount.value
      ) {
        currentPageNumber.value++;
      }
    } else {
      if (pageNumber < 1) {
        currentPageNumber.value = 1;
      } else if (pageNumber > totalPagesCount.value) {
        currentPageNumber.value = totalPagesCount.value;
      } else if (typeof pageNumber === Number) {
        currentPageNumber.value = pageNumber;
      } else {
        currentPageNumber.value = 1;
      }
    }
  };

  const updateTotalPages = dataLength => {
    totalPagesCount.value = Math.ceil(dataLength / itemsPerPage);
  };

  return {
    currentPageNumber,
    totalPagesCount,
    handleGoToPage,
    updateTotalPages,
  };
};
