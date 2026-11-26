export function validarTelefone(celular: string): boolean {
  const regexCelular = /^\([1-9]{2}\) 9\d{4}-\d{4}$/;
  return regexCelular.test(celular);
}
