// contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const tokenAuthNext = 'tokenAuth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get(tokenAuthNext);
    if (token) {
      api
        .get('/services/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          Cookies.remove(tokenAuthNext);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/services/login', {
        identifier: email,
        password,
      });
      if (response.data && response.data.token) {
        Cookies.set(tokenAuthNext, response.data.token, { expires: 30 });
        setUser(response.data);
        router.push('/');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      throw new Error('Falha no login. Verifique suas credenciais.');
    }
  };

  const logout = () => {
    Cookies.remove(tokenAuthNext);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
