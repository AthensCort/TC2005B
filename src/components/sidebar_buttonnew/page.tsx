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
  return (
    <Link href={href} className="no-underline">
      <li
        className={`
          group flex items-center gap-4 px-5 py-3 rounded-xl cursor-pointer transition-all duration-300
          ${
            active
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30"
              : "bg-white/5 hover:bg-gradient-to-r hover:from-pink-400/30 hover:to-purple-600/30 text-[#f3f4f6]"
          }
        `}
      >
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-semibold tracking-wide">{text}</span>
      </li>
    </Link>
  );
};

export default SidebarButton;
