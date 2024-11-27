import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useState } from 'react';
import { ButtonCell } from './ButtonCell';


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
  { cod: 2, produto: 'Banana', quantidade: 3, preco: 10, total: 0 },

];


export default function TableProdut() {
  const [data, setData] = useState(() =>
    mydata.map((atual) => {
      atual.total = Number(atual.preco) * Number(atual.quantidade);
      return atual
    })
  )
  // Cabeçalho da coluna 
  const columns = [
    'Cod. Prod',
    'Produto',
    'Quantidade',
    'Preço',
    'Total',
    'Remover',
  ]

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


  function handleChangeTextField(
    value: string,
    index: number,
    column: keyof Product
  ) {
    const newData = [...data]
    newData[index] = {
      ...newData[index],
      [column]: column === "produto" ? value : Number(value)
    }
    if (column === "quantidade" || column === "preco")
      newData[index].total = Number(newData[index].quantidade) * Number(newData[index].preco)
    setData(newData)
  }

  function handleRemoveRow(index: number) {
    const newData = data.filter((_, i) => i !== index)
    setData(newData)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((header, index) => (
              <TableCell key={index}  >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.cod}>
              <TableCell>{row.cod}</TableCell>
              <TableCell><TextField onChange={({ target }) => handleChangeTextField(target.value, index, "produto")} type='text' size='small' value={row.produto} /></TableCell>
              <TableCell><TextField onChange={({ target }) => handleChangeTextField(target.value, index, "quantidade")} type='number' size='small' value={row.quantidade} /></TableCell>
              <TableCell><TextField onChange={({ target }) => handleChangeTextField(target.value, index, "preco")} type='number' size='small' value={row.preco} /></TableCell>
              <TableCell><TextField disabled onChange={({ target }) => handleChangeTextField(target.value, index, "total")} type='number' size='small' value={row.total} /></TableCell>
              <TableCell>
                <ButtonCell handleClick={handleRemoveRow} index={index} />
              </TableCell>
            </TableRow>
          ))
          }
          {/*Total */}
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>{totalQuantitidade()}</TableCell>
            <TableCell>{totalPreco()}</TableCell>
            <TableCell colSpan={2}>{totalTotal()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
