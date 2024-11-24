import { useReactTable,flexRender, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';
import { useState } from 'react';
// Dados da tabela
const data = [
  { id: 1, name: 'João', age: 28 },
  { id: 2, name: 'Maria', age: 25 },
  { id: 3, name: 'Carlos', age: 32 },
];

// Definição das colunas
const columns = [
  {
    accessorKey: 'id', // Chave do dado
    header: 'ID',      // Cabeçalho da coluna
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'age',
    header: 'Idade',
  },
];
const Table = () => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}> 
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
