import { useEffect, type MouseEvent, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  // Permite fechar o alerta apertando ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    // Overlay escuro no fundo
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {/* Caixa branca do Modal */}
      <div
        onClick={handleContentClick}
        style={{
          backgroundColor: "#010518",
          padding: "30px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "650px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
