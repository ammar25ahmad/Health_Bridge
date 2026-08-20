export function renderMarkdown(text) {
  if (!text) return null

  const lines = text.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />)
      i++
      continue
    }

    const boldMatch = line.match(/^\*\*(.+?)\*\*:?\s*$/)
    if (boldMatch) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-slate-800 mt-3 mb-1">
          {boldMatch[1]}
        </h3>
      )
      i++
      continue
    }

    if (line.match(/^#{1,3}\s/)) {
      const headingText = line.replace(/^#{1,3}\s/, '')
      elements.push(
        <h3 key={i} className="text-base font-bold text-slate-800 mt-3 mb-1">
          {headingText}
        </h3>
      )
      i++
      continue
    }

    if (line.match(/^[-*]\s/)) {
      const listItems = []
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        listItems.push(lines[i].replace(/^[-*]\s/, ''))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1 my-2">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-cyan-500 mt-0.5 shrink-0">&#9679;</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    const numberedMatch = line.match(/^(\d+)[.)]\s/)
    if (numberedMatch) {
      const listItems = []
      while (i < lines.length && lines[i].match(/^\d+[.)]\s/)) {
        const num = lines[i].match(/^(\d+)[.)]\s/)[1]
        const content = lines[i].replace(/^\d+[.)]\s/, '')
        listItems.push({ num, content })
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-1 my-2">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="font-semibold text-cyan-600 shrink-0">{item.num}.</span>
              <span>{renderInline(item.content)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    elements.push(
      <p key={i} className="text-sm text-slate-700 my-1">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return elements
}

function renderInline(text) {
  const parts = []
  const regex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(<strong key={match.index} className="font-semibold text-slate-800">{match[1]}</strong>)
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}
