export const highlightedText = (text: string, search: string | undefined) => {
  if (!search) return text;
  const safeSearch = search.replace(/[.*+?^${}()|[\]]/g, '$&');
  const regex = new RegExp(`(${safeSearch.trim()})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} style={{backgroundColor: '#ffc069', padding: 0}}>
  {part}
  </mark>
) : (
    part
  )
);
}