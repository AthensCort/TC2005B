'use client';
import React from "react";
import Link from "next/link";

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, text, href, active = false }) => {
  const baseClasses = "flex items-center gap-2 px-6 py-2 rounded-xl cursor-pointer transition-all duration-300 text-base font-semibold";
  const activeClasses = "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md";
  const inactiveClasses = "bg-white/5 hover:bg-pink-600/20 text-[#f3f4f6]";

  return (
    <Link href={href} className="no-underline">
      <li className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
      </li>
    </Link>
  );
};

export default SidebarButton;
