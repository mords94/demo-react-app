import {
  Dialog as PrimeDialog,
  DialogProps as PrimeDialogProps,
} from 'primereact/dialog';
import {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import { useLocalStorage } from 'react-use';

export interface DialogProps
  extends PropsWithChildren<Omit<PrimeDialogProps, 'onHide'>> {
  onHide?: () => void;
  onShow?: () => void;
  id: string;
}

export interface DialogMethods {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const Dialog = forwardRef<DialogMethods, DialogProps>(
  ({ children, onShow: onShowProp, onHide: onHideProp, id, ...props }, ref) => {
    const [visible, setVisible] = useLocalStorage<boolean>(id, false);
    useEffect(() => {}, []);

    const onShow = useCallback(() => {
      setVisible(true);
      onShowProp?.();
    }, [onShowProp, setVisible]);

    const onHide = useCallback(() => {
      setVisible(false);
      onHideProp?.();
    }, [onHideProp, setVisible]);

    useImperativeHandle(
      ref,
      () => ({
        open: onShow,
        close: onHide,
        toggle: () => setVisible(!visible),
      }),
      [onShow, onHide, setVisible, visible]
    );

    return (
      <PrimeDialog {...props} visible={visible} onHide={onHide}>
        {children}
      </PrimeDialog>
    );
  }
);

export default Dialog;
