import { useState, useEffect } from 'react';
import { api } from './services/api';
import { ClienteList } from './components/ClienteList';
import { ClienteForm } from './components/ClienteForm';
import type { Cliente } from './types/Cliente';
import { useConfirm } from './hooks/useConfirm';
import './App.css';

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);
  const { confirm, ConfirmDialog } = useConfirm();

  // Helper para exibir mensagens temporárias
  const exibirMensagem = (tipo: 'sucesso' | 'erro', texto: string) => {
    setMensagem({ tipo, texto });
    setTimeout(() => setMensagem(null), 3000); // Limpa a mensagem após 3 segundos
  };

  // Função para buscar os dados atualizados da API
  const carregarClientes = async () => {
    try {
      const dados = await api.getClientes();
      setClientes(dados);
    } catch (error) {
      exibirMensagem('erro', 'Falha ao carregar os clientes. Erro: ' + error);
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
          setMensagem({ tipo: 'erro', texto: 'Falha ao carregar os clientes. Erro: ' + error });
          setTimeout(() => setMensagem(null), 3000);
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    };

    void buscarClientes();
    return () => {
      cancelado = true;
    };
  }, []);

  // CREATE / UPDATE
  const handleSalvar = async (cliente: Cliente) => {
    try {
      if (clienteEmEdicao && clienteEmEdicao.id) {
        await api.updateCliente(clienteEmEdicao.id, cliente);
        exibirMensagem('sucesso', 'Cliente atualizado com sucesso!');
      } else {
        await api.createCliente(cliente);
        exibirMensagem('sucesso', 'Cliente cadastrado com sucesso!');
      }
      
      setClienteEmEdicao(null); // Fecha o modo edição
      carregarClientes(); // Recarrega a tabela sem dar F5 na página
    } catch {
      exibirMensagem('erro', 'Erro ao salvar o cliente.');
    }
  };

  // DELETE
  const handleExcluir = async (id: string | number) => {
    const confirmou = await confirm('Tem certeza que deseja excluir este cliente?');
    if (!confirmou) return;

    try {
      await api.deleteCliente(id);
      exibirMensagem('sucesso', 'Cliente excluído com sucesso!');
      carregarClientes(); // Atualiza a tabela
    } catch {
      exibirMensagem('erro', 'Erro ao excluir o cliente.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Gerenciamento de Clientes</h1>

      {/* Feedback de Sucesso/Erro */}
      {mensagem && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: mensagem.tipo === 'sucesso' ? '#d4edda' : '#f8d7da',
          color: mensagem.tipo === 'sucesso' ? '#155724' : '#721c24'
        }}>
          {mensagem.texto}
        </div>
      )}

      {/* Formulário de Cadastro/Edição */}
      <ClienteForm 
        clienteEmEdicao={clienteEmEdicao} 
        onSalvar={handleSalvar} 
        onCancelar={() => setClienteEmEdicao(null)} 
      />

      {/* Tabela ou Estados de Carregamento/Vazio */}     
      {carregando ? (
        <div className='card'>
          <h2>Lista de Clientes</h2>
           <p>Carregando clientes...</p>
        </div>
      ) : clientes.length === 0 ? (
        <div className='card'>
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

      <ConfirmDialog />
    </div>
  );
}

export default App;