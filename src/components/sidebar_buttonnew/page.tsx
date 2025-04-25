'use client';
import React from "react";
import Link from "next/link";

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
  isOpen: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  text,
  href,
  active = false,
  isOpen
}) => {
  const baseClasses =
"flex items-center gap-4 px-6 py-4 rounded-xl cursor-pointer transition-all duration-300 text-base font-semibold";
  const activeClasses =
    "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md";
  const inactiveClasses =
    " hover:bg-pink-600/20 text-[#f3f4f6]";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
      title={!isOpen ? text : ""} // tooltip si está cerrado
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span>{text}</span>}
    </Link>
  );
};

export default SidebarButton;
