import { TableHead, TableRow, TableBody, TextField, Grid } from "@mui/material";
import { useUSers } from "../hooks/useUsers";
import { IUser } from "../services/user.interface";
import { deleteUSer } from "../services/userService";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  StyledButton,
  StyledDeleteButton,
  StyledTable,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
} from "../styles/StyledList";
import { useState } from "react";

export function ListUsers() {
  const { data, error, refetch } = useUSers();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUSer(userId);
      toast.success("Usuário removido com sucesso!!!");
      refetch();
    } catch (error) {
      toast.error("Erro ao excluir usuário");
    }
  };

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
                  <StyledButton onClick={handleOpenModal}>
                    <EditIcon />
                  </StyledButton>
                  <StyledDeleteButton onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </StyledDeleteButton>
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

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Nome" name="name" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email" name="email" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="RG" name="rg" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="CPF" name="cpf" margin="normal" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Data de Nascimento DD/MM/AAAA"
                name="birthdate"
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Número de celular"
                name="phone"
                margin="normal"
                fullWidth
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
