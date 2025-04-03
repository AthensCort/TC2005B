import React from "react";
import { FaTachometerAlt, FaTasks, FaUser, FaBoxOpen, FaClipboardList, FaGamepad} from "react-icons/fa";
import Image from "next/image";
import SidebarButton from "../sidebar-buttons/page"; // Import the SidebarButton component
import styles from "./page.module.css";

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-[#b9b8b8] w-64 min-h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="relative w-full flex justify-center -mb-1  -mt-7">
        <Image
          src="/lead-horizontal.png"
          alt="Lead Flow Logo"
          width={600}
          height={200}
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <Image
          src="/profile-test.jpg"
          alt="Imagen Perfil"
          width={65} // Match your CSS width
          height={65} // Match your CSS height
          className={styles.userImage} // Use your CSS styles
        />
        <p className="font-bold mt-3">Alejandra Cepeda</p>
        <p className="italic mt-1">Empleada</p>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-10 mt-5">
      <SidebarButton icon={<FaUser />} text="Profile" href="/profile" active /> {/* Active Page */}
      <SidebarButton icon={<FaTachometerAlt />} text="Dashboard" href="/dashboard" />
      <SidebarButton icon={<FaTasks />} text="Kanban" href="/profile" />
      <SidebarButton icon={<FaBoxOpen />} text="Products" href="/profile" />
      <SidebarButton icon={<FaGamepad />} text="Game" href="/profile" />
      <SidebarButton icon={<FaClipboardList />} text="Contacts" href="/profile" />
    </ul>

      </nav>
    </aside>
  );
};

export default Sidebar;
