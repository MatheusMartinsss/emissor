import { DeleteRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export function ButtonCell({ table, row}:any) {
    return  <Tooltip title="Remover">
          <IconButton onClick={() => table.options.meta.removeData(row.index)}>
            <DeleteRounded sx={{color:"#3c33ff"}}/>
          </IconButton>
       </Tooltip>
    
  }