'use client'
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
import { usePathname } from "next/navigation";
import styles from "./page.module.css";

const SidebarButton = ({
  icon,
  text,
  href,
  active,
  isOpen,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  active: boolean;
  isOpen: boolean;
}) => {
  return (
    <li>
      <a
        href={href}
        className={`flex items-center ${
          isOpen ? "space-x-4" : "justify-center"
        } px-3 py-2 rounded ${
          active ? "bg-gray-700" : "hover:bg-gray-800"
        } transition`}
      >
        <span>{icon}</span>
        {isOpen && <span>{text}</span>}
      </a>
    </li>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-900 text-[#b9b8b8] ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 min-h-screen p-4 flex flex-col justify-between`}
    >
      {/* TOP SECTION */}
      <div>
        {/* Logo */}
        <div
          className={`relative w-full flex justify-center ${
            isOpen ? "-mb-1 -mt-7" : "mb-6 mt-2"
          }`}
        >
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
            className={`${styles.userImage} ${!isOpen && "rounded-full"}`}
          />
          {isOpen && (
            <>
              <p className="font-bold mt-3">Alejandra Cepeda</p>
              <p className="italic mt-1">Empleada</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-10 mt-5">
            <SidebarButton
              icon={<FaUser />}
              text="Profile"
              href="/profile"
              active={pathname === "/profile"}
              isOpen={isOpen}
            />
            <SidebarButton
              icon={<FaTachometerAlt />}
              text="Dashboard"
              href="/dashboard"
              active={pathname === "/dashboard"}
              isOpen={isOpen}
            />
            <SidebarButton
              icon={<FaTasks />}
              text="Kanban"
              href="/kanban"
              active={pathname === "/kanban"}
              isOpen={isOpen}
            />
            <SidebarButton
              icon={<FaBoxOpen />}
              text="Products"
              href="/products"
              active={pathname === "/products"}
              isOpen={isOpen}
            />
            <SidebarButton
              icon={<FaGamepad />}
              text="Game"
              href="/game"
              active={pathname === "/game"}
              isOpen={isOpen}
            />
            <SidebarButton
              icon={<FaClipboardList />}
              text="Contacts"
              href="/contacts"
              active={pathname === "/contacts"}
              isOpen={isOpen}
            />
          </ul>
        </nav>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center mt-6">
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
