export type SuccessResponse<T> = {
  ok: true;
  status: number;
  content: T; // conteúdo da resposta da requisição
  timestamp: string;
};

export const successResponse = <T = unknown>(
  content: T,
  status = 200, // status padrão das requisições
): SuccessResponse<T> => ({
  ok: true,
  status,
  content,
  timestamp: new Date().toISOString(),
});
