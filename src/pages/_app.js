import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import MainLayout from '@/components/MainLayout';

function MyApp({ Component, pageProps }) {
  
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <AuthProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  );
}

export default MyApp;
