import { TableHead, TableRow, TableBody, TableCell, Table } from "@mui/material";
import { useUSers } from "../hooks/useUsers";
import { IUser } from "../services/user.interface";
import { deleteUSer, editUSer } from "../services/userService";
import { toast } from "react-toastify";
import { StyledTableContainer, StyledTableRow } from "../styles/StyledList";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import UserTableRow from "./UserTableRow";
import UserEditModal from "./Modal/EditModal";
import UserViewModal from "./Modal/ViewModal";

export function ListUsers() {
  const { data, error, refetch } = useUSers();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [anchorEl, setAnchorEl] = useState<Record<string, HTMLElement | null>>({});

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof IUser ) => {
    
    const { value } = e.target;

    setSelectedUser((prevUser) => ({
      ...prevUser!,
      [field]: value,
    }));
  };

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

  const handleOpenModalView = (user: IUser) => {
    setSelectedUser(user);
    setOpenModalView(true);
    handleCloseOptions(user.id);
  };

  const handleCloseModal = () => {
    setOpenModalEdit(false);
    setOpenModalView(false);
  };

  const editUserMutation = useMutation< void, Error, { userId: string; userData: IUser } >({
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data ? (
            data.data.map((user: IUser) => (

              <UserTableRow
                key={user.id}
                user={user}
                anchorEl={anchorEl}
                handleOpenOptions={handleOpenOptions}
                handleOpenModalEdit={handleOpenModalEdit}
                handleDeleteUser={handleDeleteUser}
                handleOpenModalView={handleOpenModalView}
                handleCloseOptions={handleCloseOptions}
              />
              
            ))
          ) : (
            <StyledTableRow>
              <TableCell colSpan={3}>Sem usuários.</TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table> 

      <UserEditModal
        open={openModalEdit}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
        handleInputChange={handleInputChange}
        handleSaveEdit={handleSaveEdit}
      />

      <UserViewModal
        open={openModalView}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
      />
    </StyledTableContainer>
  );
}
