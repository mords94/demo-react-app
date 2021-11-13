import { store } from '../../store/store';
import { showToast } from './toastSlice';
import { ToastSeverityType } from 'primereact/toast';

const show = (summary: string, detail: string, severity: ToastSeverityType) =>
  store.dispatch(showToast({ summary, detail, severity }));

const toast = {
  success: (detail: string = '', summary: string = 'Success') => {
    show(summary, detail, 'success');
  },
  info: (detail: string, summary: string = 'Info') => {
    show(summary, detail, 'info');
  },
  error: (detail: string, summary: string = 'Error') => {
    show(summary, detail, 'error');
  },
  warn: (detail: string = '', summary: string = 'Warning') => {
    show(summary, detail, 'warn');
  },
};

export { toast };
