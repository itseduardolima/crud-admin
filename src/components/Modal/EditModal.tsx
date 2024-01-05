import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from "@mui/material";
import { UserEditModalProps } from "../../interface/user.interface";

const UserEditModal: React.FC<UserEditModalProps> = ({ open, handleCloseModal, selectedUser, handleInputChange, handleSaveEdit }) => {

  return (

    <Dialog open={open} onClose={handleCloseModal}>
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
        <Button onClick={handleSaveEdit}>Salvar</Button>
        <Button onClick={handleCloseModal}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEditModal;
