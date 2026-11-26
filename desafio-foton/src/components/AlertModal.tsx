import { useEffect, type MouseEvent } from 'react';
import './AlertModal.css';

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  title?: string;
  buttonText?: string;
  onClose: () => void;
}

export function AlertModal({
  isOpen,
  message,
  title = 'Aviso',
  buttonText = 'OK',
  onClose,
}: AlertModalProps) {
  // Permite fechar o alerta apertando ESC ou ENTER
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onClose();
      }
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
    <div className="alert-overlay" onClick={onClose}>
      <div 
        className="alert-box" 
        onClick={handleContentClick}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
      >
        <h3 id="alert-title" className="alert-title">{title}</h3>
        <p id="alert-message" className="alert-message">{message}</p>
        
        <div className="alert-actions">
          <button 
            type="button" 
            className="alert-button" 
            onClick={onClose}
            autoFocus
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
