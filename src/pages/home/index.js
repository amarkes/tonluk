import Head from 'next/head';
import { useState } from 'react';

export default function ExamplePage() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>Página de Exemplo - Next.js</title>
        <meta name="description" content="Uma página de exemplo utilizando Next.js e React." />
      </Head>

      <main className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Página de Exemplo com Next.js</h1>
        <p className="text-lg mb-4">Este é um exemplo simples de uma página criada com Next.js e React.</p>
        <div className="mb-6">
          <p className="text-xl font-semibold mb-2">Contador: {count}</p>
          <button
            onClick={increment}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Incrementar
          </button>
        </div>
      </main>
    </div>
  );
}
