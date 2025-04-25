'use client'
import React, { useState } from "react";
import { FaTachometerAlt, FaTasks, FaUser, FaBoxOpen, FaClipboardList, FaGamepad, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import SidebarButton from "../sidebar-buttons/page";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`bg-gray-900 text-[#b9b8b8] ${isOpen ? 'w-50' : 'w-20'} min-h-screen p-4 flex flex-col transition-all duration-300`}>
      
      {/* Logo */}
      <div className="relative w-full flex justify-center -mb-1 -mt-7">
        {isOpen && (
          <Image
            src="/lead-horizontal.png"
            alt="Lead Flow Logo"
            width={600}
            height={200}
          />
        )}
      </div>

      {/* User Info */}
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
            <p className="font-bold mt-3">Alejandra Cepeda</p>
            <p className="italic mt-1">Empleada</p>
          </>
        )}
      </div>

      {/* Navigation */}
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

      {/* Toggle Button */}
      <div className="flex justify-center mt-6  mb-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
