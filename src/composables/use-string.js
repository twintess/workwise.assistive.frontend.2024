export function useParseDateTime(datetime) {
  const [datePart, timePart] = datetime.split(' ');
  const [day, month, year] = datePart.split('-');
  const [hour, minute, second] = timePart.split(':');
  return new Date(year, month - 1, day, hour, minute, second);
}
