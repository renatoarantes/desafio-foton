import { useEffect, type MouseEvent } from 'react';
import './Modal.css';

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  title?: string;
  buttonText?: string;
  isConfirm?: boolean;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export function AlertModal({
  isOpen,
  message,
  title = 'Aviso',
  buttonText = 'OK',
  isConfirm = false,
  confirmText = 'Confirmaaaaaar',
  cancelText = 'Cancelar',
  onClose,
  onConfirm,
}: AlertModalProps) {
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
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-box" 
        onClick={handleContentClick}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
      >
        <h3 id="alert-title" className="modal-title">{title}</h3>
        <p id="alert-message" className="modal-message">{message}</p>
        
        <div className="modal-actions">
          {isConfirm ? (
            <div>
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={onClose}
              >
                {cancelText}
              </button>

              <button 
                type="button" 
                className="btn-confirm" 
                onClick={onConfirm}
                autoFocus
              >
              {confirmText}
            </button>
          </div>
          ) : 
          (
            <button 
              type="button" 
              className="modal-button" 
              onClick={onClose}
              autoFocus
            >
            {buttonText}
          </button>)}
        </div>
      </div>
    </div>
  );
}
