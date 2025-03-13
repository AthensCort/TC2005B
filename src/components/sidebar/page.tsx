import React from "react";
import { FaTachometerAlt, FaTasks, FaUser, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import "./page.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="mt-4 text-white">
        LEAD<span className="text-blue-500">FLOW</span>
      </h2>
      <nav>
        <ul>
          <li className="flex items-center">
            <FaTachometerAlt className="icon mr-3" /> Dashboard
          </li>
          <li className="flex items-center">
            <FaTasks className="icon mr-3" /> Kanban
          </li>
          <li className="flex items-center active">
            <FaUser className="icon mr-3" /> Profile
          </li>
          <li className="flex items-center">
            <FaBoxOpen className="icon mr-3" /> Products
          </li>
          <li className="flex items-center">
            <FaClipboardList className="icon mr-3" /> Product Name
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <img src="/user.jpg" alt="User" />
        <p>João Ferreira</p>
        <span>Free Account</span>
      </div>
    </aside>
  );
};

export default Sidebar;
