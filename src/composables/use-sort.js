import { ref } from 'vue';

export function useSort() {
  const currentSortOrder = ref(null);
  const currentColumnSort = ref(null);

  const handleSortOrder = column => {
    if (currentColumnSort.value?.key === column.key) {
      switch (currentSortOrder.value) {
        case 'DESC':
          currentSortOrder.value = 'ASC';
          break;
        case 'ASC':
          currentSortOrder.value = null;
          currentColumnSort.value = null;
          break;
        default:
          currentSortOrder.value = 'DESC';
          break;
      }
    } else {
      currentSortOrder.value = 'DESC';
      currentColumnSort.value = column;
    }
  };

  return { currentSortOrder, currentColumnSort, handleSortOrder };
}
