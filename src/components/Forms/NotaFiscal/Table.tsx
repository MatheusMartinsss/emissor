import { ArrowBack, ArrowRight, Delete, DeleteForever } from '@mui/icons-material';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { Box, Button, Checkbox, IconButton, Paper,Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useReactTable,flexRender, getCoreRowModel, getSortedRowModel, ColumnDef, RowData } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
// Dados da tabela
const mydata = [
  { cod: 1, produto: 'Bolacha', quantidade: 28 , preco: 2999, total: 3200},
  { cod: 1, produto: 'Bolacha', quantidade: 28 , preco: 2999, total: 3200},
  { cod: 1, produto: 'Bolacha', quantidade: 28 , preco: 2999, total: 3200},
  { cod: 1, produto: 'Bolacha', quantidade: 28 , preco: 2999, total: 3200},
];

// Definição das colunas

/* const TableMy = () => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange"
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th style={{position:"relative"}} key={header.id}> 
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
 */
export default function BasicTable() {
  const [data, setData] = useState(mydata)
   const columns :ColumnDef<RowData>[] = [
    {
      accessorKey: 'cod', // Chave do dado
      header: 'Cod. Prod',      // Cabeçalho da coluna 
    },
    {
      accessorKey: 'produto',
      header: 'Produto',
    
    },
    {
      accessorKey: 'quantidade',
      header: 'Quantidade',
      cell: EditCell
    },
    {
      accessorKey: 'preco',
      header: 'Preço',
      cell: EditCell
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: EditCell
    },
    {
      accessorKey: 'remover',
      header: 'Remover',
      cell: ButtonCell
    },
  ];
  const table = useReactTable({
    data,
    columns,
    meta: { 
      updateData: (rowIndex:number, columnId:string, value: string) => (
        setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, [columnId]: value } : row))
      ),
      updateAllData: (rowIndex:number, columnId:string, value: string) => {
        if (columnId === "quantidade"){
          setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, ["total"]: Number(value) * prevData[index].preco } : row))
        }
        if (columnId === "preco"){
          setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, ["total"]: Number(value) * prevData[index].quantidade } : row))
        }
      },
      removeData: (rowIndex:number) => (
        setData((prevData) => prevData.filter((row, index) => index !== rowIndex)
      )
    )
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode:"onChange"
  });

  function totalQuantitidade() {
      const total = data.reduce((acc, value) =>
          acc += Number(value.quantidade)
      , 0)
      return total
  }

  function totalPrec() {
    const total = data.reduce((acc, value) =>
        acc += Number(value.quantidade)
    , 0)
    return total
}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
       
        <TableHead>
        {table.getHeaderGroups().map(headerGroup => (

          <TableRow>
              {headerGroup.headers.map(header => (
                  <TableCell sx={{position:"relative"}}>

                    {
                        flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                   {/*  <Box  onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} sx={{position:"absolute",cursor: "col-resize", right:0, top:0, width:"5px", height:"100%", bgcolor:"black", touchAction:"none", userSelect:"none"}}/>
 */}
                  </TableCell>
              ))}
          </TableRow>
        ))} 
        </TableHead>
        <TableBody>
        {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               {row.getVisibleCells().map(cell => (
              <TableCell component="th" scope="row">
              {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                )}
              </TableCell>
               ))}
         
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={5}>Total</TableCell>
            <TableCell>{totalQuantitidade()}</TableCell>
            <TableCell>78</TableCell>
            <TableCell>788</TableCell>  
          </TableRow>

          {/* <TableRow>
            <TableCell><Button><ArrowBack/> Voltar</Button></TableCell>
            <TableCell><Button> Avançar <ArrowRight/></Button></TableCell>  
          </TableRow> */}
        </TableBody>

        <TableFooter>

        </TableFooter>
      </Table>
    </TableContainer>
  );
}
 


function EditCell({getValue, table, column, row}:any){     
 const[value, setValue] = useState(getValue());
  
  useEffect(() => {
  setValue(getValue());
 }, [getValue]);
  useEffect(() => {
   if (column.id === "quantidade") {
       
   }
  }, [value])
  function onBlur() {
    table.options.meta.updateData(row.index, column.id, value);
    table.options.meta.updateAllData(row.index, column.id, value);
  }
  return <TextField  onBlur={onBlur} type='number' size='small' value={value} onChange={(e)=>setValue(e.target.value)} />;
}

function ButtonCell({ table, row}:any) {
  return  <Tooltip title="Remover">
        <IconButton onClick={() => table.options.meta.removeData(row.index)}>
          <DeleteRounded sx={{color:"#3c33ff"}}/>
        </IconButton>
     </Tooltip>
  
}