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
      <tbody className="pp-table__body">{children}</tbody>
    </table>
  );
}

function TableHeader({ labels }: { labels: string[] }) {
  return (
    <thead>
      <tr>
        {labels.map((label) => (
          <th key={label}>{label}</th>
        ))}
      </tr>
    </thead>
  );
}
