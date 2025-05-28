export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const formatDateLocale = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
