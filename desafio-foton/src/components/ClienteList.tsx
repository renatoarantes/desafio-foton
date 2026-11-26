import type { Cliente } from '../types/Cliente';
import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { formatarTelefone } from '../utils/formatters';

interface Props {
  clientes: Cliente[];
  onEditar: (cliente: Cliente) => void;
  onEditarModal: (cliente: Cliente) => void;
  onExcluir: (id: string | number) => void;
}

export function ClienteList({ clientes, onEditar, onEditarModal, onExcluir }: Props) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{formatarTelefone(cliente.telefone)}</td>
              <td>
                <span className={cliente.ativo ? 'badge-ativo' : 'badge-inativo'}>
                  {cliente.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td>
                <div className="acoes">
                  <button className="btn-editar" title="Rota" onClick={() => navigate(`/edit/${cliente.id}`)}><BsFillPencilFill /></button>
                  <button className="btn-editar" title="Modal" onClick={() => onEditarModal(cliente)}><BsFillPencilFill /></button>
                  <button className="btn-editar" title="Acima" onClick={() => onEditar(cliente)}><BsFillPencilFill /></button>
                  <button className="btn-excluir" title="Excluir" onClick={() => onExcluir(cliente.id!)}><BsFillTrashFill /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}