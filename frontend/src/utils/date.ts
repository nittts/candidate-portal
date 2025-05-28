export function getNextBusinessDay(startDate = new Date(), offset = 3) {
  const result = new Date(startDate);
  let added = 0;

  while (added < offset) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) {
      added++;
    }
  }

  return result.toISOString();
}
