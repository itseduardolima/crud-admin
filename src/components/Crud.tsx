import { Container, Button, TextField } from "@mui/material";
import { ListUsers } from "./List";

const UserCrud = () => {
  return (
    <Container>
      <TextField label="Nome" name="name" margin="normal" />
      <TextField label="Email" name="email" margin="normal" />
      <Button variant="contained" color="primary">
        Adicionar
      </Button>
      <ListUsers />
    </Container>
  );
};

export default UserCrud;
