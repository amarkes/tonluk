// components/MainLayout.js
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Sidebar from '@/components/sidebar/sidebar';
import { useRouter } from 'next/router';

export default function MainLayout({ children }) {
    const router = useRouter();
    const isLoginPage = router.pathname === '/auth/login';
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [loading, user, router]);

    if (isLoginPage) {
        // Se for a página de login, renderiza somente o conteúdo sem o layout principal
        return <div className="min-h-screen flex items-center justify-center">{children}</div>;
    }
    return (
        <>
            {loading || !user ? (
                <div className="min-h-screen flex items-center justify-center">Carregando...</div>
            ) : (
                <div className="min-h-screen flex flex-col">
                    {/* Cabeçalho */}
                    <header className="bg-blue-600 text-white p-4">
                        <nav className="flex space-x-4">
                            <Link href="/">
                                Início
                            </Link>
                            <Link href="/profile">
                                Perfil
                            </Link>
                            <Link href="/settings">
                                Configurações
                            </Link>
                        </nav>
                    </header>

                    {/* Conteúdo Principal */}
                    <div className='flex '>
                        <Sidebar />
                        <main className="flex-1 p-8">
                            {children}
                        </main>
                    </div>

                    {/* Rodapé */}
                    <footer className="bg-gray-800 text-white p-4 text-center">
                        © 2024 Minha Aplicação
                    </footer>
                </div>
            )}
        </>
    );
}
