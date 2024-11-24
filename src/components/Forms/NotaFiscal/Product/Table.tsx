import {  ArrowLeftSharp, ArrowRightSharp, } from '@mui/icons-material';
import { Button, Paper,styled,Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from '@mui/material';
import { useReactTable,flexRender, getCoreRowModel, ColumnDef, getPaginationRowModel, PaginationState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import EditCell from './Product/EditCell';
import { ButtonCell } from './Product/ButtonCell';

// Dados da tabela
interface Product {
  cod: number;
  produto: string;
  quantidade: number;
  preco: number;
  total: number;
}

// Dados da tabela
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


export default function TableProdut() {
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

//estilo das linhas
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
          <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                  <TableCell key={header.id} width={header.getSize()} >
                    {
                        flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
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