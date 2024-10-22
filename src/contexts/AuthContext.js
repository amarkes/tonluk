// contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const tokenAuthNext = 'tokenAuth';

export const blockSystemStore = 'PrecisaCopiarNaoSoPedirOProjeto';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [countLogin, setCountLogin] = useState(0);
  const [isBlockSystem, setIsBlockSystem] = useState(Cookies.get(blockSystemStore));

  useEffect(() => {
    const token = Cookies.get(tokenAuthNext);
    console.log(isBlockSystem)
    if (isBlockSystem) {
      router.replace('/troll');
      return;
    }
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
      setCountLogin(0);
      setLoading(false);
    }
  }, []);

  const listErrors = [
    "Algo não está certo... Mas tudo bem, às vezes o caminho tem pequenas pedras. Verifique seus dados e tente novamente. Você está quase lá!",
    "Parece que algo escapou... Confira suas credenciais e vamos tentar de novo. Nada que uma boa persistência não resolva!",
    "Hmm, credenciais não reconhecidas! Mas não se preocupe, até os melhores erram. Dá uma olhadinha e vamos tentar outra vez. O sucesso te espera!",
    "Quase lá! Aparentemente, algo não combinou. Revise seus dados e tente mais uma vez. Lembre-se, a persistência abre todas as portas!",
    "Credenciais incorretas, mas não desanime! Até o caminho mais difícil leva ao topo. Verifique suas informações e vamos em frente!"
  ];
  
  // Função que retorna uma mensagem aleatória
  function getErrorMessage() {
    const randomItem = Math.floor(Math.random() * listErrors.length);
    return listErrors[randomItem];
  }

  const _setBlockSystem = () => {
    Cookies.set(blockSystemStore, 'A vida é como uma jornada com altos e baixos. Às vezes, o caminho é claro e suave; outras vezes, cheio de obstáculos e curvas inesperadas. Mas lembre-se: cada desafio é uma oportunidade disfarçada. O que parece uma derrota hoje pode ser o início de uma vitória amanhã. O importante não é o quão rápido você chega, mas o quão longe você está disposto a ir, sempre acreditando no seu potencial. Continue avançando, porque a vida não para, e a sua força está em nunca desistir dos seus sonhos. O futuro pertence aos que se levantam todas as vezes que caem.', { expires: 30 });
  }

  const login = async (email, password) => {
    try {
      if (countLogin >= 11) {
        _setBlockSystem();
        router.replace('/troll');
        return;
      }
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
      setCountLogin(countLogin + 1);
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      if (countLogin >= 10) {
        throw new Error('Você tá de brincadeira, né? Quantas vezes vai errar? Dá uma revisada nesse teclado aí antes de tentar de novo!');
      }
      throw new Error(getErrorMessage());
    }
  };

  const logout = () => {
    Cookies.remove(tokenAuthNext);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isBlockSystem, setIsBlockSystem, _setBlockSystem }}>
      {children}
    </AuthContext.Provider>
  );
}
