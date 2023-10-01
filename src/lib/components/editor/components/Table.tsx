interface TableProps {
  readonly labels: Array<string>;
  className: string;
  hasDefault?: true;
  children: JSX.Element | JSX.Element[];
}

export function Table({ className, labels, children }: TableProps) {
  return (
    <table className={className}>
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
