import { useState, useCallback } from 'react';
import { AlertModal } from '../components/AlertModal';

interface AlertState {
  isOpen: boolean;
  message: string;
  title: string;
  resolve: (() => void) | null;
}

export function useAlert() {
  const [state, setState] = useState<AlertState>({
    isOpen: false,
    message: '',
    title: 'Aviso',
    resolve: null,
  });

  const alert = useCallback((message: string, title = 'Aviso'): Promise<void> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        message,
        title,
        resolve,
      });
    });
  }, []);

  const handleClose = () => {
    state.resolve?.();
    setState({ isOpen: false, message: '', title: 'Aviso', resolve: null });
  };

  const AlertDialog = () => (
    <AlertModal
      isOpen={state.isOpen}
      title={state.title}
      message={state.message}
      onClose={handleClose}
    />
  );

  return { alert, AlertDialog };
}
