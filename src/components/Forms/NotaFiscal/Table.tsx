import { ArrowBack, ArrowForwardIosOutlined, ArrowLeftOutlined, ArrowLeftSharp, ArrowRight, ArrowRightAltOutlined, ArrowRightSharp, Delete, DeleteForever } from '@mui/icons-material';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { Box, Button, Checkbox, IconButton, Paper,styled,Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { useReactTable,flexRender, getCoreRowModel, getSortedRowModel, ColumnDef, RowData, getPaginationRowModel, PaginationState } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

// Dados da tabela
interface Product {
  cod: number;
  produto: string;
  quantidade: number;
  preco: number;
  total: number;
}

const mydata: Product[] = [
  { cod: 1, produto: 'Bolacha', quantidade: 2, preco: 10, total: 0 },
  { cod: 2, produto: 'Pao', quantidade: 2, preco: 10, total: 0 },
  { cod: 3, produto: 'Abacate', quantidade: 2, preco: 10, total: 0 },
  { cod: 4, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 5, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 6, produto: 'Bolacha', quantidade: 2, preco: 10, total: 0 },
  { cod: 7, produto: 'Pao', quantidade: 2, preco: 10, total: 0 },
  { cod: 8, produto: 'Abacate', quantidade: 2, preco: 10, total: 0 },
  { cod: 9, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 10, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 1, produto: 'Bolacha', quantidade: 2, preco: 10, total: 0 },
  { cod: 2, produto: 'Pao', quantidade: 2, preco: 10, total: 0 },
  { cod: 3, produto: 'Abacate', quantidade: 2, preco: 10, total: 0 },
  { cod: 4, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 5, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 6, produto: 'Bolacha', quantidade: 2, preco: 10, total: 0 },
  { cod: 7, produto: 'Pao', quantidade: 2, preco: 10, total: 0 },
  { cod: 8, produto: 'dddddddd', quantidade: 2, preco: 10, total: 0 },
  { cod: 9, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 10, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 1, produto: 'Bolacha', quantidade: 2, preco: 10, total: 0 },
  { cod: 2, produto: 'Pao', quantidade: 2, preco: 10, total: 0 },
  { cod: 3, produto: 'Abacate', quantidade: 2, preco: 10, total: 0 },
  { cod: 4, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 5, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 6, produto: 'Bolacha', quantidade: 2, preco: 10, total: 0 },
  { cod: 7, produto: 'Pao', quantidade: 2, preco: 10, total: 0 },
  { cod: 8, produto: 'Abacate', quantidade: 2, preco: 10, total: 0 },
  { cod: 9, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
  { cod: 10, produto: 'Banana', quantidade: 2, preco: 10, total: 0 },
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
  const [pagination, setPagination] = useState<PaginationState>({ 
    pageIndex: 0,
    pageSize: 3, //linhas por página
  })
   const columns = useMemo<ColumnDef<Product>[]>(()=> [
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
  ], []);
  const table = useReactTable({
    data,
    columns,
    state:{
     pagination,
    },
    autoResetAll: false,
    autoResetPageIndex: false,
    onPaginationChange: setPagination, // Atualiza o estado local de paginação
    meta: { 
      updateData: (rowIndex:number, columnId:string, value: string) => (
        setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, [columnId]: value } : row))
      ),
      updateAllData: (rowIndex:number, columnId:string, value: string) => {
         
        if (columnId === "quantidade"){
          setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, ["total"]: Number(value) * prevData[index].preco } : row))
        }
        else if (columnId === "preco"){
          setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, ["total"]: Number(value) * prevData[index].quantidade } : row))
        }else{
          setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, ["total"]: Number(prevData[index].preco) * Number(prevData[index].quantidade)} : row))
        }
      },
      firstLoald: (rowIndex:number, columnId:string, value: string) => {
        setData((prevData) => prevData.map((row, index) => index === rowIndex ? { ...row, ["total"]: Number(prevData[index].preco) * Number(prevData[index].quantidade)} : row))
      },
      removeData: (rowIndex:number) => (
        setData((prevData) => prevData.filter((row, index) => index !== rowIndex)
      )
    )
    },
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode:"onChange",
    getPaginationRowModel: getPaginationRowModel()
  });

  function totalQuantitidade() {
      const total = data.reduce((acc, value) =>
          acc += Number(value.quantidade)
      , 0)
      return total
  }

  function totalPreco() {
    const total = data.reduce((acc, value) =>
        acc += Number(value.preco)
    , 0)
    return total
}

function totalTotal() {
  const total = data.reduce((acc, value) =>
      acc += Number(value.total)
  , 0)
  return total
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow>
              {headerGroup.headers.map(header => (
                  <TableCell sx={{position:"relative", width: header.id === 'produto' ? 250 : 'auto'}}>
                    {
                        flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                    <Box  onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} sx={{position:"absolute",cursor: "col-resize", right:0, top:0, width:"5px", height:"100%", bgcolor:"black", touchAction:"none", userSelect:"none"}}/>
                  </TableCell>
              ))}
          </TableRow>
        ))} 
        </TableHead>
        <TableBody>
        {table.getRowModel().rows.map(row => (
            <StyledTableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
               {row.getVisibleCells().map(cell => (
              <TableCell   component="th" scope="row">
              {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                )}
              </TableCell>
               ))}
            </StyledTableRow>
          ))}

          {/*Total */}
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>{totalQuantitidade()}</TableCell>
            <TableCell>{totalPreco()}</TableCell>
            <TableCell colSpan={2}>{totalTotal()}</TableCell>  
          </TableRow>

          <TableRow>
            <TableCell><Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} variant='outlined' ><ArrowLeftSharp /> Voltar</Button></TableCell>
            <TableCell><Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} variant='outlined'> Avançar <ArrowRightSharp/></Button></TableCell>  
          </TableRow>
        </TableBody>
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
    table.options.meta.firstLoald(row.index, column.id, getValue());
 }, []);

  
  function handleChange(e:any) {
    setValue(e.target.value);
    if (column.id === "quantidade" || column.id === "preco"){
      table.options.meta.updateData(row.index, column.id, e.target.value);
      table.options.meta.updateAllData(row.index, column.id, e.target.value);
    }
  } 
  return <TextField  type='number' size='small' value={value} onChange={handleChange} />;
}

function ButtonCell({ table, row}:any) {
  return  <Tooltip title="Remover">
        <IconButton onClick={() => table.options.meta.removeData(row.index)}>
          <DeleteRounded sx={{color:"#3c33ff"}}/>
        </IconButton>
     </Tooltip>
  
}