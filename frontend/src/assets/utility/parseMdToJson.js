export default function parseMdToJson(md) {
  const eol = "\r"; // or "\n" for LF
  const markdownStringWithEol = md.replace(/\n/g, eol);
  return JSON.stringify(markdownStringWithEol);
}
