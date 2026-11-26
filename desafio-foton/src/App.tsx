import { useState, useEffect } from "react";
import { api } from "./services/api";
import { ClienteList } from "./components/ClienteList";
import { ClienteForm } from "./components/ClienteForm";
import type { Cliente } from "./types/Cliente";
import "./App.css";
import { useAlert } from "./hooks/useAlert";
import { Modal } from './components/Modal';
import { formatarTelefone } from "./utils/formatters";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [formKey, setFormKey] = useState(0);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);
  const { alert, AlertDialog } = useAlert();
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteModal, setClienteModal] = useState<Cliente | null>(null);

  // Função para buscar os dados atualizados da API
  const carregarClientes = async () => {
    try {
      const dados = await api.getClientes();
      setClientes(dados);
    } catch (error) {
      alert("Falha ao carregar os clientes. Erro: " + error, "Erro");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    let cancelado = false;

    const buscarClientes = async () => {
      try {
        const dados = await api.getClientes();
        if (!cancelado) setClientes(dados);
      } catch (error) {
        if (!cancelado) {
          alert("Falha ao carregar os clientes. Erro: " + error, "Erro");
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    };

    void buscarClientes();
    return () => {
      cancelado = true;
    };
  }, [alert]);

  // CREATE / UPDATE
  const handleSalvar = async (cliente: Cliente, isModal: boolean = false) => {
    try {
      if (cliente.id) {
        await api.updateCliente(cliente.id, cliente);
        alert("Cliente atualizado com sucesso!", "Sucesso");
      } else {
        await api.createCliente(cliente);
        alert("Cliente cadastrado com sucesso!", "Sucesso");
      }

      if (isModal) {
        setModalAberto(false);
        setClienteModal(null);
      } else {
        setClienteEmEdicao(null);
        setFormKey((prev) => prev + 1);
      }

      carregarClientes(); 
    } catch {
      alert("Erro ao salvar o cliente.", "Erro");
    }
  };

  // DELETE
  const handleExcluir = async (id: string | number) => {
    const confirmou = await alert(
      "Tem certeza que deseja excluir este cliente?",
      "Confirmação",
      true,
      "Excluir",
      "Cancelar",
    );
    if (!confirmou) return;

    try {
      await api.deleteCliente(id);
      alert("Cliente excluído com sucesso!", "Sucesso");
      carregarClientes(); // Atualiza a tabela
    } catch {
      alert("Erro ao excluir o cliente.", "Erro");
    }
  };

  const handleAbrirModal = (cliente: Cliente) => {
    setClienteModal({...cliente, telefone: formatarTelefone(cliente.telefone)}); 
    setModalAberto(true);
  };

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Gerenciamento de Clientes</h1>

      {/* Formulário de Cadastro/Edição */}
      <ClienteForm
        key={formKey}
        clienteEmEdicao={clienteEmEdicao ? { ...clienteEmEdicao, telefone: formatarTelefone(clienteEmEdicao.telefone) } : null}
        onSalvar={handleSalvar}
        onCancelar={() => setClienteEmEdicao(null)}
      />

      {/* Tabela ou Estados de Carregamento/Vazio */}
      {carregando ? (
        <div className="card">
          <h2>Lista de Clientes</h2>
          <p>Carregando clientes...</p>
        </div>
      ) : clientes.length === 0 ? (
        <div className="card">
          <h2>Lista de Clientes</h2>
          <p>Nenhum cliente cadastrado.</p>
        </div>
      ) : (
        <ClienteList
          clientes={clientes}
          onEditar={setClienteEmEdicao}
          onEditarModal={handleAbrirModal}
          onExcluir={handleExcluir}
        />
      )}

      <AlertDialog />
       <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <ClienteForm 
          clienteEmEdicao={clienteModal} 
          onSalvar={(data) => handleSalvar(data, true)} 
          onCancelar={() => setModalAberto(false)} 
        />
      </Modal>
    </div>
  );
}

export default App;
