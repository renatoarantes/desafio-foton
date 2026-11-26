import "./Pagination.css";

interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onPageChange: (pagina: number) => void;
}

export function Pagination({
  paginaAtual,
  totalPaginas,
  onPageChange,
}: PaginationProps) {
  if (totalPaginas <= 1) return null;

  const getPageNumbers = () => {
    const paginas: (number | string)[] = [];
    const maxVisiveis = 7;

    if (totalPaginas <= maxVisiveis) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
      return paginas;
    }

    const meioVisivel = maxVisiveis - 2;
    const metade = Math.floor(meioVisivel / 2);

    let start = Math.max(2, paginaAtual - metade);
    const end = Math.min(totalPaginas - 1, start + meioVisivel - 1);

    if (end === totalPaginas - 1) {
      start = Math.max(2, end - meioVisivel + 1);
    }

    paginas.push(1);

    if (start > 2) {
      paginas.push("...");
    }

    for (let i = start; i <= end; i++) {
      paginas.push(i);
    }

    if (end < totalPaginas - 1) {
      paginas.push("...");
    }

    paginas.push(totalPaginas);

    return paginas;
  };

  const paginas = getPageNumbers();

  return (
    <div className="pagination-container">
      {/* Botão Anterior */}
      <button
        onClick={() => onPageChange(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className="pagination-button"
      >
        Anterior
      </button>

      {/* Botões Numéricos */}
      {paginas.map((pagina, index) => {
        if (pagina === "...") {
          return (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          );
        }

        const isActive = pagina === paginaAtual;

        return (
          <button
            key={pagina}
            onClick={() => onPageChange(pagina as number)}
            className={`pagination-number ${isActive ? "active" : ""}`}
          >
            {pagina}
          </button>
        );
      })}

      {/* Botão Próxima */}
      <button
        onClick={() => onPageChange(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className="pagination-button"
      >
        Próxima
      </button>
    </div>
  );
}
