import { useState, useEffect } from "react";
import { api } from "./services/api";
import { ClienteList } from "./components/ClienteList";
import { ClienteForm } from "./components/ClienteForm";
import type { Cliente } from "./types/Cliente";
import "./App.css";
import { useAlert } from "./hooks/useAlert";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);
  const { alert, AlertDialog } = useAlert();

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

  // Carrega a lista assim que a tela monta
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
  const handleSalvar = async (cliente: Cliente) => {
    try {
      if (clienteEmEdicao && clienteEmEdicao.id) {
        await api.updateCliente(clienteEmEdicao.id, cliente);
        alert("Cliente atualizado com sucesso!", "Sucesso");
      } else {
        await api.createCliente(cliente);
        alert("Cliente cadastrado com sucesso!", "Sucesso");
      }

      setClienteEmEdicao(null); // Fecha o modo edição
      carregarClientes(); // Recarrega a tabela sem dar F5 na página
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

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Gerenciamento de Clientes</h1>

      {/* Formulário de Cadastro/Edição */}
      <ClienteForm
        clienteEmEdicao={clienteEmEdicao}
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
          onExcluir={handleExcluir}
        />
      )}

      <AlertDialog />
    </div>
  );
}

export default App;
