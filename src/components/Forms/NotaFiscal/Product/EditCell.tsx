import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export  default function EditCell({getValue, table, column, row}:any){     
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
  return <TextField type='number' size='small' value={value} onChange={handleChange} />;
}
