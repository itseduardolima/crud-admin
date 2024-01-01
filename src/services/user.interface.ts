export interface IUser {
  name: string;
  email: string;
}

export interface UserResponse {
  data: IUser[];
}
