import { DeleteRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export function ButtonCell({ handleClick, index }: { handleClick: (index:number) => void, index: number }) {
  return <Tooltip title="Remover">
    <IconButton onClick={() => handleClick(index)}>
      <DeleteRounded sx={{ color: "#3c33ff" }} />
    </IconButton>
  </Tooltip>

}