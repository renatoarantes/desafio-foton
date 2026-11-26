import { useState, useCallback } from 'react';
import { AlertModal } from '../components/AlertModal';

interface AlertState {
  isOpen: boolean;
  message: string;
  title: string;
  isConfirm: boolean;
  confirmText: string;
  cancelText: string;
  resolve: ((value: boolean) => void) | null;
}

export function useAlert() {
  const [state, setState] = useState<AlertState>({
    isOpen: false,
    message: '',
    title: 'Aviso',
    isConfirm: false,
    confirmText: 'OK',
    cancelText: 'Cancelar',
    resolve: null,
  });

  const alert = useCallback((message: string, title = 'Aviso', isConfirm = false, confirmText = 'OK', cancelText = 'Cancelar'): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        message,
        title,
        isConfirm,
        confirmText,
        cancelText,
        resolve,
      });
    });
  }, []);

  const handleClose = () => {
    state.resolve?.(false);
    setState({ isOpen: false, message: '', title: 'Aviso', isConfirm: false, resolve: null, confirmText: '', cancelText: '' });
  };

  const handleConfirm = () => {
    state.resolve?.(true);
    setState({ isOpen: false, message: '', title: 'Aviso', isConfirm: false, resolve: null, confirmText: '', cancelText: '' });
  };

  const AlertDialog = () => (
    <AlertModal
      isOpen={state.isOpen}
      title={state.title}
      message={state.message}
      onClose={handleClose}
      onConfirm={handleConfirm}
      isConfirm={state.isConfirm}
      confirmText={state.confirmText}
      cancelText={state.cancelText}
    />
  );

  return { alert, AlertDialog };
}
