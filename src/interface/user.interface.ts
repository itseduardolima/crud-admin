import { IUser } from "../services/user.interface";

export interface UserEditModalProps {
  open: boolean;
  handleCloseModal: () => void;
  selectedUser: IUser | null;
  handleInputChange: ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof IUser ) => void;
  handleSaveEdit: () => void;
  
}

export interface UserViewModalProps {
  open: boolean;
  handleCloseModal: () => void;
  selectedUser: IUser | null;
}
