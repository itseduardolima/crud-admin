export const validateDate = (date: string) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
  return regex.test(date);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const isValidCPF = (cpf: string) => {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (
    !cpf ||
    cpf.length !== 11 ||
    !Array.from(cpf).filter((e) => e !== cpf[0]).length
  ) {
    return false;
  }
  let sum = 0,
    rest;
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
};

export const isAtLeastFourYearsOld = (birthDate: string): boolean => {
  const [day, month, year] = birthDate.split("/").map(Number);
  const birth = new Date(year, month - 1, day);

  if (
    birth.getDate() !== day ||
    birth.getMonth() + 1 !== month ||
    birth.getFullYear() !== year
  ) {
    return false;
  }

  const today = new Date();
  let ageDifference = today.getFullYear() - year;

  if (
    today.getMonth() < month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() < day)
  ) {
    ageDifference--;
  }

  return ageDifference >= 4 && ageDifference <= 100;
};
