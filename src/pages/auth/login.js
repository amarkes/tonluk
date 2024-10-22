// pages/auth/login.js
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [loading, user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>Login - Next.js</title>
        <meta name="description" content="P\u00e1gina de login." />
      </Head>

      <main className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite sua senha"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

// Não aplicar o layout à página de login
LoginPage.getLayout = function getLayout(page) {
  return page;
};
