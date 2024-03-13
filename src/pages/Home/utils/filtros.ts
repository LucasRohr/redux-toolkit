import { Viagem } from "src/types/viagem";
import { Filtros } from "../types";

export const filtrarViagens = (
  viagens: Viagem[],
  filtros: Omit<Filtros, "pessoas">,
  cidadeUsuario: string,
  estadoUsuario: string
): Promise<Viagem[]> => {
  const viagensFiltradas = viagens.filter((viagem) => {
    const filtroPorCidade =
      filtros.filtrarPorUsuario !== "cidade" || viagem.origem === cidadeUsuario;
    const filtroPorEstado =
      filtros.filtrarPorUsuario !== "estado" ||
      viagem.estadoOrigem === estadoUsuario;
    const filtroOrigem =
      !filtros.origem ||
      filtros.origem === viagem.origem ||
      filtros.origem === viagem.estadoOrigem;
    const filtroDestino =
      !filtros.destino || filtros.destino === viagem.destino;
    const filtroTipo = !filtros.tipo || viagem.tipo === filtros.tipo;
    const filtroDataIda =
      !filtros.dataIda || viagem.dataIda === filtros.dataIda;
    const filtroDataVolta =
      !filtros.dataVolta || viagem.dataVolta === filtros.dataVolta;

    return (
      filtroPorCidade &&
      filtroPorEstado &&
      filtroOrigem &&
      filtroDestino &&
      filtroTipo &&
      filtroDataIda &&
      filtroDataVolta
    );
  });
  return new Promise((resolve) =>
    setTimeout(() => resolve(viagensFiltradas), 1000)
  );
};

export const filtrosEstaoVazios = ({
  tipo,
  origem,
  destino,
  filtrarPorUsuario,
  dataIda,
  dataVolta,
}: Filtros) =>
  !tipo &&
  !origem &&
  !destino &&
  filtrarPorUsuario === "todas" &&
  !dataIda &&
  !dataVolta;
