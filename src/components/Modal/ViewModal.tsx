import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { TitleModal, ModalContainer, Info, Data } from "../../styles/StyledList";
import { UserViewModalProps } from "../../interface/user.interface";

const UserViewModal: React.FC<UserViewModalProps> = ({ open, handleCloseModal, selectedUser }) => {

  return (
    
    <Dialog open={open}>
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
  );
};

export default UserViewModal;
