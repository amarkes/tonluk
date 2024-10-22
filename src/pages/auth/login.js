// pages/auth/login.js
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './style.module.css';

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
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Head>
        <title>tonluk - login</title>
        <meta name="description" content="faça teu login no tonluk" />
      </Head>

      <main className={styles.loginContent}>
        <h1 className={styles.loginTitlePage}>É muito ter você de volta!</h1>
        <span className={styles.loginSubTitlePage}>Estamos prontos para ajudar você a alcançar seus objetivos.
        Entre com seus dados e continue de onde parou. A jornada continua, e você é o protagonista dessa história!</span>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div>
            <label className={styles.loginLabel}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.loginInput}
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <label className={styles.loginLabel}>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.loginInput}
              placeholder="Digite sua senha"
            />
          </div>
          {error && (
            <p className={styles.loginError}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className={styles.loginButton}
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
