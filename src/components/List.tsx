import { TableHead, TableRow, TableBody, TextField, Grid, Menu, IconButton,  MenuItem } from "@mui/material";
import { useUSers } from "../hooks/useUsers";
import { IUser } from "../services/user.interface";
import { deleteUSer } from "../services/userService";
import { toast } from "react-toastify";
import ListIcon from "@mui/icons-material/List";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { StyledTable, StyledTableCell, StyledTableContainer, StyledTableRow } from "../styles/StyledList";
import { useEffect, useState } from "react";

export function ListUsers() {

  const { data, error, refetch } = useUSers();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [anchorEl, setAnchorEl] = useState<Record<string, HTMLElement | null>>( {} );

  const handleOpenOptions = ( event: React.MouseEvent<HTMLButtonElement>, userId: string ) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [userId]: event.currentTarget,
    }));
  };

  const handleCloseOptions = (userId: string) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [userId]: null,
    }));
  };

  const handleOpenModalEdit = (user: IUser) => {
    setSelectedUser(user);
    setOpenModalEdit(true);
    handleCloseOptions(user.id);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenModalEdit(false);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUSer(userId);
      toast.success("Usuário removido com sucesso!!!");
      refetch();
    } catch (error) {
      toast.error("Erro ao excluir usuário");
      console.error(`Erro ao excluir usuário:`, error);
    }
    handleCloseOptions(userId);
  };

  useEffect(() => {
    Object.keys(anchorEl).forEach((userId) => {
      handleCloseOptions(userId);
    });
  }, [data, anchorEl]);

  if (error) {
    return <p>Erro ao carregar usuários.</p>;
  }

  return (
    <StyledTableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>

            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Ações</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>

          {data?.data ? (
            data.data.map((user: IUser) => (

              <StyledTableRow key={user.id}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>

                <StyledTableCell>
                  <IconButton onClick={(e) => handleOpenOptions(e, user.id)}>
                    <ListIcon />
                  </IconButton>

                  <Menu
                    id={`options-menu-${user.id}`}
                    anchorEl={anchorEl[user.id]}
                    open={Boolean(anchorEl[user.id])}
                    onClose={() => handleCloseOptions(user.id)}
                  >
                    <MenuItem onClick={() => handleOpenModalEdit(user)}>
                      Editar
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteUser(user.id)}>
                      Excluir
                    </MenuItem>
                  </Menu>

                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={3}>Sem usuários.</StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </StyledTable>

      {/* MODAL EDIT*/}

      <Dialog open={openModalEdit} onClose={handleCloseModal}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nome"
                name="name"
                margin="normal"
                fullWidth
                value={selectedUser?.name || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                margin="normal"
                fullWidth
                value={selectedUser?.email || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="RG"
                name="rg"
                margin="normal"
                value={selectedUser?.rg || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="CPF"
                name="cpf"
                margin="normal"
                value={selectedUser?.cpf || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Data de Nascimento DD/MM/AAAA"
                name="birthdate"
                margin="normal"
                value={selectedUser?.birthdate || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Número de celular"
                name="phone"
                margin="normal"
                value={selectedUser?.phone || ""}
              />
            </Grid>

          </Grid>

          <Button variant="contained" color="primary">
            Salvar
          </Button>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </StyledTableContainer>
  );
}
