// components/Sidebar.js
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineHome, AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-blue-600 text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out min-h-screen p-5`}>
      <div className="flex items-center justify-between">
        <h1 className={`font-bold text-2xl ${!isOpen && 'hidden'}`}>Menu</h1>
        <button onClick={toggleSidebar}>
          <AiOutlineMenu size={24} />
        </button>
      </div>
      <nav className="mt-10 space-y-4">
        <Link href="/" className="flex items-center space-x-2 hover:bg-blue-500 px-4 py-2 rounded">
          <AiOutlineHome size={24} />
          <span className={`${!isOpen && 'hidden'} text-lg`}>Início</span>
        </Link>
        <Link href="/home" className="flex items-center space-x-2 hover:bg-blue-500 px-4 py-2 rounded">
          <AiOutlineUser size={24} />
          <span className={`${!isOpen && 'hidden'} text-lg`}>Perfil</span>
        </Link>
        {/* <Link href="/settings" className="flex items-center space-x-2 hover:bg-blue-500 px-4 py-2 rounded">
          <AiOutlineSetting size={24} />
          <span className={`${!isOpen && 'hidden'} text-lg`}>Configurações</span>
        </Link> */}
      </nav>
    </div>
  );
}
