// UserTableRow.tsx
import React from "react";
import {
  TableCell,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { IUser } from "../services/user.interface";
import { StyledTableRow } from "../styles/StyledList";

interface UserTableRowProps {
  user: IUser;
  anchorEl: Record<string, HTMLElement | null>; // Add this prop
  handleOpenOptions: (
    event: React.MouseEvent<HTMLButtonElement>,
    userId: string
  ) => void;
  handleOpenModalEdit: (user: IUser) => void;
  handleDeleteUser: (userId: string) => void;
  handleOpenModalView: (user: IUser) => void;
  handleCloseOptions: (userId: string) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  anchorEl,
  handleOpenOptions,
  handleOpenModalEdit,
  handleDeleteUser,
  handleOpenModalView,
  handleCloseOptions,
}) => (
  <StyledTableRow key={user.id}>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <IconButton onClick={(e) => handleOpenOptions(e, user.id)}>
        <ListIcon />
      </IconButton>
      <Menu
        id={`options-menu-${user.id}`}
        anchorEl={anchorEl[user.id]}
        open={Boolean(anchorEl[user.id])}
        onClose={() => handleCloseOptions(user.id)}
      >
        <MenuItem onClick={() => handleOpenModalEdit(user)}>Editar</MenuItem>
        <MenuItem onClick={() => handleDeleteUser(user.id)}>Excluir</MenuItem>
        <MenuItem onClick={() => handleOpenModalView(user)}>
          Visualizar
        </MenuItem>
      </Menu>
    </TableCell>
  </StyledTableRow>
);

export default UserTableRow;
