import React, { useState, ChangeEvent } from "react";
import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import { useUserMutate } from "../hooks/useUsers";
import { IUser } from "../services/user.interface";
import { applyMask } from "../utils/Mask";
import {
  isAtLeastFourYearsOld,
  isValidCPF,
  isValidEmail,
} from "../utils/Validate";
import { toast } from "react-toastify";

const Form = () => {
  const [user, setUser] = useState<IUser>({
    id: "",
    phone: "",
    name: "",
    email: "",
    rg: "",
    cpf: "",
    birthdate: "",
  });

  const userMutate = useUserMutate();
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const maskedValue = applyMask(value, name);

    if (name === "phone") {

      const isValid = /^(?!([0-9])\1+$)[1-9]{2}9?[0-9]{8}$/.test(value);

      if (!isValid) {
        setPhoneError("Número de telefone inválido!");
      } else {
        setPhoneError(null);
      }
    }

    setUser((prevUser) => ({ ...prevUser, [name]: maskedValue }));
  };

  const handleAddUser = async () => {

    if (!user.name || !user.email || !user.rg || !user.cpf || !user.birthdate || !user.phone) {
      toast.error("Preencha todos os campos antes de adicionar o usuário.");
      return;
    }

    setUser({
      id: "",
      phone: "",
      name: "",
      email: "",
      rg: "",
      cpf: "",
      birthdate: "",
    });

    userMutate.mutate(user);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Painel de Administração
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nome"
            name="name"
            margin="normal"
            fullWidth
            value={user.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            name="email"
            margin="normal"
            fullWidth
            value={user.email}
            onChange={handleInputChange}
            error={!isValidEmail(user.email) && user.email !== ""}
            helperText={
              !isValidEmail(user.email) && user.email !== ""
                ? "Por favor, insira um email válido"
                : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="RG"
            name="rg"
            margin="normal"
            fullWidth
            value={user.rg}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CPF"
            name="cpf"
            margin="normal"
            fullWidth
            value={user.cpf}
            onChange={handleInputChange}
            error={!isValidCPF(user.cpf)}
            helperText={!isValidCPF(user.cpf) ? "CPF inválido" : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Data de Nascimento DD/MM/AAAA"
            name="birthdate"
            margin="normal"
            fullWidth
            value={user.birthdate}
            onChange={handleInputChange}
            error={
              !isAtLeastFourYearsOld(user.birthdate) && user.birthdate !== ""
            }
            helperText={
              !isAtLeastFourYearsOld(user.birthdate) && user.birthdate !== ""
                ? "Por favor, insira uma data válida. A idade deve estar entre 4 e 100 anos."
                : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Número de celular"
            name="phone"
            margin="normal"
            fullWidth
            value={user.phone}
            onChange={handleInputChange}
            error={!!phoneError}
            helperText={phoneError}
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Adicionar
      </Button>
    </Container>
  );
};

export default Form;
