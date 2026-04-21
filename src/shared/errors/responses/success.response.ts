export type SuccessResponse<T> = {
  ok: true;
  status: number;
  content: T; //  representa o payload retornado pela requisição
  timestamp: string;
};

// Estrutura padrão de resposta de sucesso enviada pelos controllers
// Monta o payload final de sucesso com status, content e timestamp
export const successResponse = <T = unknown>(
  content: T,
  status = 200, // status padrão das requisições, pode ser modificado
): SuccessResponse<T> => ({
  ok: true,
  status,
  content,
  timestamp: new Date().toISOString(),
});
