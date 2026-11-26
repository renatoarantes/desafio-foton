import type { Cliente } from '../types/Cliente';

const BASE_URL = 'http://localhost:3000'; 

export const api = {
  getClientes: () => fetch(`${BASE_URL}/clientes`).then(r => r.json()),
  getClienteById: (id: string) => 
    fetch(`${BASE_URL}/clientes/${id}`).then(r => {
      if (!r.ok) throw new Error('Cliente não encontrado');
      return r.json();
    }),
  createCliente: (data: Omit<Cliente, 'id'>) =>
    fetch(`${BASE_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  updateCliente: (id: string | number, data: Partial<Cliente>) =>
    fetch(`${BASE_URL}/clientes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  deleteCliente: (id: string | number) =>
    fetch(`${BASE_URL}/clientes/${id}`, { method: 'DELETE' }),
};