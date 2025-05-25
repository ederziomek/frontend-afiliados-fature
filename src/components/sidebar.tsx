"use client"; // Needed for useState

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, BarChart2, Users, CreditCard, Star, Award, HelpCircle, Menu, X, Gift, CalendarDays, Megaphone } from 'lucide-react'; // Added Gift, CalendarDays, Megaphone
import Image from 'next/image';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  // Controle de exibição do logo para evitar flash durante transições
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Quando o menu abre, garantimos que o logo não seja exibido
      setShowLogo(false);
    } else {
      // Quando o menu fecha, só exibimos o logo após a transição completa
      const timer = setTimeout(() => {
        setShowLogo(true);
      }, 300); // Tempo da transição CSS
      
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '/', icon: Home, label: 'Início' }, // Renamed from Painel
    { href: '/categoria', icon: Star, label: 'Categoria' }, // Renamed from Minha Categoria
    { href: '/sequencia-diaria', icon: CalendarDays, label: 'Sequência Diária' },
    { href: '/baus', icon: Gift, label: 'Baús' },
    { href: '/relatorios', icon: BarChart2, label: 'Relatórios' },
    { href: '/minha-rede', icon: Users, label: 'Minha Rede' },
    { href: '/divulgacao', icon: Megaphone, label: 'Divulgação' },
    { href: '/carteira', icon: CreditCard, label: 'Carteira' },
    { href: '/ajuda', icon: HelpCircle, label: 'Ajuda' },
  ];

  return (
    <>
      {/* Mobile Menu Button (visible on small screens) */}
      <div className="md:hidden fixed top-4 left-4 z-50 flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-card text-white rounded-md shadow-lg"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"} // Dynamic label
        >
          {/* Keep the hamburger icon here, the X will be inside the menu */}
          <Menu size={24} className="text-[rgb(18,201,185)]" />
        </button>
        <Link href="/" className="ml-2 text-white font-bold">Fature</Link>
      </div>

      {/* Sidebar (visible on medium screens and up, or when mobile menu is open) */}
      <aside
        className={`fixed top-0 left-0 h-full bg-card text-white w-64 p-4 flex flex-col transition-transform duration-300 ease-in-out z-40 md:static md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}
      >
        {/* Close Button (Top Right inside the opened mobile menu) */}
        {isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-1 text-text-secondary hover:text-white md:hidden"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        )}

        {/* Logo Placeholder - Adjust as needed */}
        <div className={`${isMobileMenuOpen ? 'h-0 mb-0 overflow-hidden' : 'mb-8'} flex justify-center items-center pt-0 md:pt-0 md:mb-8`}>
          {/* Texto removido do menu hambúrguer quando aberto em mobile */}
          {!isMobileMenuOpen && showLogo && (
            <span className="text-xl font-bold">Fature100x</span>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-grow ${isMobileMenuOpen ? 'pt-12' : ''}`}>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} legacyBehavior>
                  <a
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on navigation
                    className="flex items-center px-3 py-2 rounded-md text-text-secondary hover:bg-border hover:text-white transition-colors"
                    // Add active link styling based on current route (requires useRouter hook)
                  >
                    <item.icon size={20} className="mr-3 text-[rgb(18,201,185)]" />
                    <span>{item.label}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer/Logout (Optional) */}
        {/* <div className="mt-auto">
          <button className="flex items-center w-full px-3 py-2 rounded-md text-text-secondary hover:bg-border hover:text-white transition-colors">
            <LogOut size={20} className="mr-3" />
            <span>Sair</span>
          </button>
        </div> */}
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
