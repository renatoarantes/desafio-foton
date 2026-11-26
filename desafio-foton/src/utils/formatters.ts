export function formatarTelefone(valor: string): string {
  const apenasNumeros = valor.replace(/\D/g, "");

  const limitado = apenasNumeros.slice(0, 11);

  if (limitado.length === 0) return "";

  if (limitado.length <= 2) {
    return `(${limitado}`;
  }

  if (limitado.length <= 7) {
    return `(${limitado.slice(0, 2)}) ${limitado.slice(2)}`;
  }

  return `(${limitado.slice(0, 2)}) ${limitado.slice(2, 7)}-${limitado.slice(7)}`;
}