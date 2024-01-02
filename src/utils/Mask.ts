export const applyMask = (value: string, name: string): string => {
  switch (name) {
    case "cpf":
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    case "birthdate":
      return value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    case "phone":
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    default:
      return value;
  }
};
