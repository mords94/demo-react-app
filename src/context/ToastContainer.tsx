import React, { useRef } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';
import { useReduxEffect } from 'use-redux-effect';
import { showToast } from '../features/toast/toastSlice';

const toastMessageDefaults: ToastMessage = {};

const ToastContainer = () => {
  const toast = useRef<Toast>(null);

  const show = (toastMessage: ToastMessage) => {
    toast.current?.show({
      ...toastMessageDefaults,
      ...toastMessage,
    });
  };

  useReduxEffect(
    (effect) => {
      show(effect.payload);
    },
    showToast.toString(),
    []
  );

  return <Toast ref={toast} position="bottom-right" />;
};

export default ToastContainer;
