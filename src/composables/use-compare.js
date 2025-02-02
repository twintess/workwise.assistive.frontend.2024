import { useParseDateTime } from '@/composables/use-string';

export function useCompare(array, column, order) {
  switch (column.type) {
    case String:
      return useCompareString(array, column.key, order);
    case Date:
      return useCompareDate(array, column.key, order);
    default:
      console.error(`Comparer for type ${column.type} not declared`);
      return [];
  }
}

function useCompareString(array, columnName, order) {
  return array.toSorted((a, b) => {
    const loweredA = a[columnName]?.toLowerCase() || ' ';
    const loweredB = b[columnName]?.toLowerCase() || ' ';

    if (loweredA === loweredB) return 0;
    else if (order === 'ASC') {
      return loweredA > loweredB ? 1 : -1;
    } else if (order === 'DESC') {
      return loweredA < loweredB ? 1 : -1;
    }
  });
}

function useCompareDate(array, columnName, order) {
  return array.toSorted((a, b) => {
    const dateA = useParseDateTime(a[columnName]);
    const dateB = useParseDateTime(b[columnName]);

    if (dateA === dateB) return 0;
    else if (order === 'ASC') {
      return dateA > dateB ? 1 : -1;
    } else if (order === 'DESC') {
      return dateA < dateB ? 1 : -1;
    }

    return 0;
  });
}
