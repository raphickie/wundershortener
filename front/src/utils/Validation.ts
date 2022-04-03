export function isValidHttpUrl(input: string) {
  let url;
  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }
  return (
    (url.protocol === "http:" || url.protocol === "https:") &&
    (url.href == input || url.origin == input)
  );
}
