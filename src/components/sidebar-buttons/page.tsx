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
        className={`flex items-center space-x-3 px-4 py-4 rounded-lg cursor-pointer transition-all duration-300 
        ${active ? "bg-[#3d465e] text-white" : "hover:bg-gray-800 text-gray-300"}`}
      >
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </li>
    </Link>
  );
};

export default SidebarButton



// const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, text, active = false }) => {
//   return (
//     <li
//   className={`flex items-center text-[#b9b8b8] space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 
//   ${active ? "bg-[#3d465e] text-white" : "hover:bg-gray-800"}`}
// >
//   <span className="text-lg">{icon}</span>
//   <span className="text-sm font-medium">{text}</span>
// </li>
//   );
// };

// export default SidebarButton; // ✅ Correctly exporting SidebarButton
