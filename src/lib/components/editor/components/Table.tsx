import React from "react";

interface TableProps {
  readonly labels: Array<string>;
  hasDefault?: true;
  children: JSX.Element | JSX.Element[];
}

export function Table({ labels, children }: TableProps) {
  return (
    <table>
      <TableHeader labels={labels} />
      <tbody>{children}</tbody>
    </table>
  );
}

function TableHeader({ labels }: { labels: string[] }) {
  return (
    <thead>
      <tr>
        {labels.map((label) => (
          <td key={label}>
            <strong>{label}</strong>
          </td>
        ))}
      </tr>
    </thead>
  );
}
