export function Markdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\n+/);

  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-foreground">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h3 key={index} className="text-lg font-bold text-dark-teal">
              {block.replace("## ", "")}
            </h3>
          );
        }
        if (block.includes("| ---")) {
          const rows = block
            .split("\n")
            .filter((line) => line.trim().startsWith("|"))
            .map((line) =>
              line
                .split("|")
                .slice(1, -1)
                .map((cell) => cell.trim()),
            );
          const [header, , ...body] = rows;
          const data = rows[1]?.every((cell) => /^-+$/.test(cell)) ? body : rows.slice(1);
          return (
            <div key={index} className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-dark-teal text-white">
                  <tr>
                    {header?.map((cell) => (
                      <th key={cell} className="px-3 py-2 font-semibold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="odd:bg-white even:bg-light-teal/40">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-3 py-2 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (block.startsWith("|")) {
          return (
            <pre key={index} className="overflow-x-auto text-sm">
              {block}
            </pre>
          );
        }
        const lines = block.split("\n");
        if (lines.every((line) => /^\d+\.\s/.test(line) || line.startsWith("- "))) {
          return (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {lines.map((line) => (
                <li key={line}>{line.replace(/^\d+\.\s/, "").replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
