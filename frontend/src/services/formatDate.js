export function FormatDate(dateString) {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
    .replace(",", "");
}
