import {
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Grid,
  Menu,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useUSers } from "../hooks/useUsers";
import { IUser } from "../services/user.interface";
import { deleteUSer, editUSer } from "../services/userService";
import { toast } from "react-toastify";
import ListIcon from "@mui/icons-material/List";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Data,
  Info,
  ModalContainer,
  StyledTable,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  TitleModal,
} from "../styles/StyledList";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";


export function ListUsers() {
  const { data, error, refetch } = useUSers();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [anchorEl, setAnchorEl] = useState<Record<string, HTMLElement | null>>(
    {}
  );

  const handleOpenOptions = (
    event: React.MouseEvent<HTMLButtonElement>,
    userId: string
  ) => {
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

  const handleOpenModalView = (user: IUser) => {
    setSelectedUser(user);
    setOpenModalView(true);
    handleCloseOptions(user.id);
  };

  const handleCloseModal = () => {
    setOpenModalEdit(false);
    setOpenModalView(false);
  };

  const editUserMutation = useMutation<
    void,
    Error,
    { userId: string; userData: Partial<IUser> }
  >({
    mutationFn: async ({ userId, userData }) => {
      await editUSer(userId, userData);
    },
    onSuccess: () => {
      toast.success("Usuário editado com sucesso!");
      refetch();
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(`Erro ao editar usuário: ${error.message}`);
    },
  });

  const handleSaveEdit = async () => {
    if (selectedUser) {
      try {
        await editUserMutation.mutateAsync({
          userId: selectedUser.id,
          userData: selectedUser,
        });
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof IUser
  ) => {
    const { value } = e.target;

    setSelectedUser((prevUser) => ({
      ...prevUser!,
      [field]: value,
    }));
  };

  useEffect(() => {
    Object.keys(anchorEl).forEach((userId) => {
      handleCloseOptions(userId);
    });
  }, []);

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

                    <MenuItem onClick={() => handleOpenModalView(user)}>
                      Visualizar
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
        <DialogTitle>Cadastro de {selectedUser?.name} </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nome"
                name="name"
                margin="normal"
                fullWidth
                value={selectedUser?.name || ""}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                margin="normal"
                fullWidth
                value={selectedUser?.email || ""}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="RG"
                name="rg"
                margin="normal"
                value={selectedUser?.rg || ""}
                onChange={(e) => handleInputChange(e, "rg")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="CPF"
                name="cpf"
                margin="normal"
                value={selectedUser?.cpf || ""}
                onChange={(e) => handleInputChange(e, "cpf")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Data de Nascimento DD/MM/AAAA"
                name="birthdate"
                margin="normal"
                value={selectedUser?.birthdate || ""}
                onChange={(e) => handleInputChange(e, "birthdate")}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Número de celular"
                name="phone"
                margin="normal"
                value={selectedUser?.phone || ""}
                onChange={(e) => handleInputChange(e, "phone")}
              />
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Salvar
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL View*/}

      <Dialog open={openModalView}>
        <TitleModal>Dados do usuário</TitleModal>
        <DialogContent>
          <ModalContainer>
            <Info>
              <Data>
                <span>Nome: {selectedUser?.name} </span>
                <span>Email: {selectedUser?.email} </span>
                <span>Data de Nascimento: {selectedUser?.birthdate} </span>
                <span>Número de celular: {selectedUser?.phone} </span>
                <span>CPF: {selectedUser?.cpf} </span>
                <span>RG: {selectedUser?.rg} </span>
              </Data>
            </Info>
          </ModalContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </StyledTableContainer>
  );
}
