export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  rg: string;
  cpf: string;
  birthdate: string;
}

export interface UserResponse {
  data: IUser[];
}
