import { useState, ChangeEvent } from "react";
import { Container, Typography, Button, TextField } from "@mui/material";
import { useUserMutate } from "../hooks/useUsers";

const Dashboard = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const userMutate = useUserMutate();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAddUser = async () => {
    const newUser = { id, name, email };
    setId("")
    setName("");
    setEmail("");
    userMutate.mutate(newUser);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Painel de Administração
      </Typography>

      <TextField
        label="Nome"
        name="name"
        margin="normal"
        fullWidth
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        label="Email"
        name="email"
        margin="normal"
        fullWidth
        value={email}
        onChange={handleEmailChange}
      />
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Adicionar
      </Button>
    </Container>
  );
};

export default Dashboard;
