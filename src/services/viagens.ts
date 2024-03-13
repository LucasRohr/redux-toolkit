import server from "assets/server";
import { Viagem } from "src/types/viagem";

export const getViagens = (
  pagina: number = 1,
  limite: number = 5
): Promise<{
  novasViagens: Viagem[];
  pagina: number;
  totalPaginas: number;
}> => {
  const totalViagens = server.viagens.length;
  const primeiraViagem = (pagina - 1) * limite;
  const ultimaViagem = pagina * limite;
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          novasViagens: [...server.viagens.slice(primeiraViagem, ultimaViagem)],
          pagina,
          totalPaginas: Math.ceil(totalViagens / limite),
        }),
      1000
    )
  );
};

export const carregarOrigens = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const origens = server.viagens.map((viagem) => viagem.origem).sort();
    return setTimeout(() => resolve([...new Set(origens)]), 1000);
  });
};

export const carregarDestinos = (): Promise<string[]> => {
  return new Promise((resolve) => {
    const destinos = server.viagens.map((viagem) => viagem.destino).sort();
    return setTimeout(() => resolve([...new Set(destinos)]), 1000);
  });
};
