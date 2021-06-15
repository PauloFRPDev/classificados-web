import { ReactNode } from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
