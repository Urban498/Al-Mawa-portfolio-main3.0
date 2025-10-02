'use client';

import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={true}
      richColors={true}
      closeButton={true}
      toastOptions={{
        duration: 4000,
        style: {
          zIndex: 99999,
        },
        classNames: {
          toast: 'bg-white border border-gray-200 text-gray-900',
          success: 'bg-green-500 text-white border-green-600',
          error: 'bg-red-500 text-white border-red-600',
          warning: 'bg-yellow-500 text-white border-yellow-600',
          info: 'bg-blue-500 text-white border-blue-600',
        },
      }}
    />
  );
}
