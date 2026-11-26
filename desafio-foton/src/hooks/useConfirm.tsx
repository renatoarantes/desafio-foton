import { useState, useCallback } from 'react';
import { ConfirmModal } from '../components/ConfirmModal';

interface ConfirmState {
  isOpen: boolean;
  message: string;
  resolve: ((value: boolean) => void) | null;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    message: '',
    resolve: null,
  });

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        message,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    state.resolve?.(true);
    setState({ isOpen: false, message: '', resolve: null });
  };

  const handleCancel = () => {
    state.resolve?.(false);
    setState({ isOpen: false, message: '', resolve: null });
  };

  const ConfirmDialog = () => (
    <ConfirmModal
      isOpen={state.isOpen}
      message={state.message}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, ConfirmDialog };
}
