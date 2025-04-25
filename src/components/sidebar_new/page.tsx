'use client';
import React, { useEffect, useRef, useState } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaGamepad,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import SidebarButton from "../sidebar_buttonnew/page";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
 

  // CERRAR AL HACER CLICK FUERA
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`transition-all duration-300 ${isOpen ? styles.sidebar : 'w-18'} min-h-screen flex flex-col bg-gradient-to-br from-[#0b022b] to-[#4b0082] rounded-xl shadow-lg border-2 border-white backdrop-blur-lg`}
    >
      {/* LOGO */}
      <div className="flex justify-center -mb-2">
        {isOpen && (
          <Image
            src="/lead-horizontal.png"
            alt="Lead Flow Logo"
            width={600}
            height={200}
          />
        )}
      </div>

      {/* USER INFO */}
      <div className="flex flex-col items-center text-center mb-4">
        <Image
          src="/profile-test.jpg"
          alt="Imagen Perfil"
          width={65}
          height={65}
          className={styles.userImage}
        />
        {isOpen && (
          <>
            <p className="font-bold text-white mt-3">Alejandra Cepeda</p>
            <span className="italic text-sm text-gray-400">Empleada</span>
          </>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1">
        <ul className="space-y-1c">
          <SidebarButton icon={<FaUser />} text="Profile" href="/profile" active={pathname === "/profile"}  isOpen={isOpen} />
          <SidebarButton icon={<FaTachometerAlt />} text="Dashboard" href="/dashboard" active={pathname === "/dashboard"}  isOpen={isOpen} />
          <SidebarButton icon={<FaTasks />} text="Kanban" href="/kanban" active={pathname === "/kanban"}  isOpen={isOpen} />
          <SidebarButton icon={<FaBoxOpen />} text="Products" href="/products" active={pathname === "/products"}  isOpen={isOpen} />
          <SidebarButton icon={<FaGamepad />} text="Game" href="/game" active={pathname === "/game"}  isOpen={isOpen} />
          <SidebarButton icon={<FaClipboardList />} text="Contacts" href="/contacts" active={pathname === "/contacts"}  isOpen={isOpen} />
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar; 
