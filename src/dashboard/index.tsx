import { Container, Typography, Button, TextField } from "@mui/material";

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Painel de Administração
      </Typography>

      <TextField label="Nome" name="name" margin="normal" fullWidth />
      <TextField label="Email" name="email" margin="normal" fullWidth />
      <Button variant="contained" color="primary">
        Adicionar
      </Button>
    </Container>
  );
};

export default Dashboard;
