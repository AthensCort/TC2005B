'use client';
import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`transition-all duration-300 ${isOpen ? styles.sidebar : 'w-20'} min-h-screen flex flex-col`}
    >
      {/* LOGO */}
      <div className="flex justify-center mb-6">
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
      <div className="flex flex-col items-center text-center mb-6">
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
        <ul className="space-y-2">
          <SidebarButton icon={<FaUser />} text="Profile" href="/profile" active={pathname === "/profile"} />
          <SidebarButton icon={<FaTachometerAlt />} text="Dashboard" href="/dashboard" active={pathname === "/dashboard"} />
          <SidebarButton icon={<FaTasks />} text="Kanban" href="/kanban" active={pathname === "/kanban"} />
          <SidebarButton icon={<FaBoxOpen />} text="Products" href="/products" active={pathname === "/products"} />
          <SidebarButton icon={<FaGamepad />} text="Game" href="/game" active={pathname === "/game"} />
          <SidebarButton icon={<FaClipboardList />} text="Contacts" href="/contacts" active={pathname === "/contacts"} />
        </ul>
      </nav>

      {/* TOGGLE BUTTON */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.toggleButton}
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
