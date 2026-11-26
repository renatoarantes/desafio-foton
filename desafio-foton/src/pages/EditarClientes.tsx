import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { ClienteForm } from "../components/ClienteForm";
import type { Cliente } from "../types/Cliente";
import { useAlert } from "../hooks/useAlert";

export default function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [carregando, setCarregando] = useState(true);

  const { alert, AlertDialog } = useAlert();

  useEffect(() => {
    const buscarCliente = async () => {
      try {
        const dados = await api.getClienteById(id!);
        setCliente(dados);
      } catch {
        await alert("Erro ao carregar os dados do cliente.", "Erro");
        navigate("/");
      } finally {
        setCarregando(false);
      }
    };

    buscarCliente();
  }, [id, alert, navigate]);

  const handleSalvar = async (dadosAtualizados: Cliente) => {
    try {
      await api.updateCliente(id!, dadosAtualizados);
      await alert("Cliente atualizado com sucesso!", "Sucesso");
      navigate("/");
    } catch {
      await alert("Erro ao atualizar o cliente.", "Erro");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Editar Cliente</h1>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <ClienteForm
          clienteEmEdicao={cliente}
          onSalvar={handleSalvar}
          onCancelar={() => navigate("/")}
        />
      )}

      <AlertDialog />
    </div>
  );
}
