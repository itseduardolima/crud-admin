import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "./user.interface";

const url = "http://localhost:3001/users";

export async function createUser(newUser: IUser) {
  const userWithId = { ...newUser, id: uuidv4() };
  const response = await axios.post(url, userWithId);
  return response.data;
}

export const getUser = async () => {
    const response = await axios.get(url);
    return response;
  }

export async function deleteUSer(userId: string) {
  await axios.delete(`${url}/${userId}`);
}

export async function editUSer(userId: string) {
  await axios.put(`${url}/${userId}`);
}
