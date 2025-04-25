'use client';
import React, { useEffect, useRef, useState } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaGamepad,
} from "react-icons/fa";
import Image from "next/image";
import SidebarButton from "../sidebar_buttonnew/page";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
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
      className={`transition-all duration-300 ${
        isOpen ? styles.sidebar : styles.sidebarCollapsed
      } min-h-screen flex flex-col bg-gradient-to-br from-[#0b022b] to-[#4b0082] rounded-xl shadow-lg backdrop-blur-lg`}
    >
      {/* LOGO */}
      <div className="flex justify-center mt-6 mb-2">
        {isOpen && (
          <Image
            src="/lead-horizontal.png"
            alt="Lead Flow Logo"
            width={200}
            height={80}
            className="object-contain"
          />
        )}
      </div>

      {/* USER INFO */}
      <div className="flex flex-col items-center text-center mb-4">
        {isOpen && (
          <>
            <p className="font-bold text-white mt-2">Alejandra Cepeda</p>
            <span className="italic text-sm text-gray-400">Empleada</span>
          </>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 mt-10">
        <ul className={`${isOpen ? "space-y-1" : "space-y-5"} flex flex-col`}>
          <SidebarButton icon={<FaUser />} text="Profile" href="/profile" active={pathname === "/profile"} isOpen={isOpen} />
          <SidebarButton icon={<FaTachometerAlt />} text="Dashboard" href="/dashboard" active={pathname === "/dashboard"} isOpen={isOpen} />
          <SidebarButton icon={<FaTasks />} text="Kanban" href="/kanban" active={pathname === "/kanban"} isOpen={isOpen} />
          <SidebarButton icon={<FaBoxOpen />} text="Products" href="/products" active={pathname === "/products"} isOpen={isOpen} />
          <SidebarButton icon={<FaGamepad />} text="Game" href="/game" active={pathname === "/game"} isOpen={isOpen} />
          <SidebarButton icon={<FaClipboardList />} text="Contacts" href="/contacts" active={pathname === "/contacts"} isOpen={isOpen} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
