import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import MainLayout from '@/components/MainLayout';

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo, {user?.firstName}</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg w-32 hover:bg-red-600 transition duration-300">
        Sair
      </button>
    </div>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
