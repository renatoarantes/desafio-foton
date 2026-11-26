import { useState, type SubmitEvent  } from 'react';
import type { Cliente } from '../types/Cliente';
import { BsFillFloppy2Fill, BsXCircle } from "react-icons/bs";
import { AlertModal } from './AlertModal';

interface Props {
  clienteEmEdicao: Cliente | null;
  onSalvar: (cliente: Cliente) => Promise<void>;
  onCancelar: () => void;
}

export function ClienteForm({ clienteEmEdicao, onSalvar, onCancelar }: Props) {
  const [alerta, setAlerta] = useState<{ aberto: boolean; mensagem: string }>({
    aberto: false,
    mensagem: '',
  });

  const mostrarAlerta = (mensagem: string) => {
    setAlerta({ aberto: true, mensagem });
  };

  const fecharAlerta = () => {
    setAlerta({ aberto: false, mensagem: '' });
  };

  return (
    <div>
      <AlertModal
        isOpen={alerta.aberto}
        message={alerta.mensagem}
        onClose={fecharAlerta}
      />
      <ClienteFormFields
        key={JSON.stringify(clienteEmEdicao)}
        clienteEmEdicao={clienteEmEdicao}
        onSalvar={onSalvar}
        onCancelar={onCancelar}
        mostrarAlerta={mostrarAlerta}
      />
    </div>    
  );
}

function ClienteFormFields({ clienteEmEdicao, onSalvar, onCancelar, mostrarAlerta }: Props & { mostrarAlerta: (mensagem: string) => void }) {
  const [formData, setFormData] = useState<Cliente>(() => clienteEmEdicao ?? ({
    nome: '',
    email: '',
    telefone: '',
    ativo: true,
  }));

  const handleSubmit = async (e: SubmitEvent ) => {
    e.preventDefault();
    
    // Validação básica (Nome e Email obrigatórios)
    if (!formData.nome.trim() || !formData.email.trim()) {
      mostrarAlerta('Nome e E-mail são obrigatórios!');
      return;
    }

    await onSalvar(formData);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>{clienteEmEdicao ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nome *"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        
          <input
            type="email"
            placeholder="E-mail *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          <input
            type="text"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          />
        </div>        

        <div className="form-footer">
          <label className="checkbox-group">
            <input
              type="checkbox"
              checked={formData.ativo}
              onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
            />
            Cliente Ativo
          </label>

          <div className="form-actions">
            <button type="submit" className="btn-salvar">
              Salvar Cliente <BsFillFloppy2Fill />
            </button>
            {clienteEmEdicao && (
              <button type="button" className="btn-cancelar" onClick={onCancelar}>
                Cancelar <BsXCircle />
              </button>
            )}
          </div>
        </div>

      </form>
    </div>
  );
}