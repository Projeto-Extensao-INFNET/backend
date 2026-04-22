export type PaginationQueryDto = {
  page?: number; // página atual
  limit?: number; // limite de dados por página
};

export type PaginationResultDto<T> = {
  meta: {
    page?: number; // página atual
    limit?: number; // limite atual
    total_items: number; // total de dados
    total_pages: number; // total de páginas
  };
  data: T[]; // T = tipo genérico para o retorno do array de objetos com os dados paginados
};
