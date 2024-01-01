import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getUser } from "../services/userService";
import { toast } from "react-toastify";

export function useUSers() {
  const query = useQuery({
    queryFn: getUser,
    queryKey: ["users"],
  });

  return {
    ...query,
    data: query.data
  }
}

export function useUserMutate() {
    const mutate = useMutation({
      mutationFn: createUser,
      onSuccess: () => {
        toast.success(`Usuário criado com sucesso`);
      },
      onError: (error) => {
        toast.error(`Erro ao criar usuário`);
        console.error(`Erro ao criar usuário:`, error);
      },
    });
  
    return mutate;
  }
