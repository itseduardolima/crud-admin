import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
} from "@mui/material";
import { useUSers } from "../hooks/useUsers";
import { IUser } from "../services/user.interface";
import { deleteUSer } from "../services/userService";
import { toast } from "react-toastify";

export function ListUsers() {
  const { data, error, refetch } = useUSers();

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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Perfil</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data ? (
            data.data.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>Icone</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Sem usuários.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
