'use client'
import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css";
import { FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Home() {

  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([
    { name: "Alejandra Velazquez", email: "palomitas@hotmail.com", Business: "Bimbo", prefix: 52, phone: 8124300715 },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    Business: "",
    prefix: "",
    phone: "",
  });

  return (
    <div className="h-screen w-full flex bg-[#07101d]">
      {/* Sidebar */}
      <Sidebar />
  
      {/* Main Content */}
      <div className="flex-1 bg-dark p-6 text-white overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold pl-8 mt-5">Contacts</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#1877f2] hover:bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center mt-5 mr-16"
          >
            Add Contact <span className="ml-5">+</span>
          </button>
        </div>
  
        {/* Table */}
        <div className={`${styles.tableContainer} bg-dark-700 p-4 rounded-lg`}>
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="p-4 w-[20%]">Name</th>
                <th className="p-4 w-[25%]">Email</th>
                <th className="p-4 w-[20%]">Business</th>
                <th className="p-4 w-[10%]">Prefix</th>
                <th className="p-4 w-[20%]">Phone</th>
                <th className="p-4 w-[5%]"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((item, index) => (
                <tr
                  key={index}
                  className="bg-gray-800 text-white rounded-xl overflow-hidden"
                >
                  <td className="p-4 italic flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full bg-[#1877f2] mr-3" />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 flex items-center">
                    <FaRegEnvelope className="mr-2" />
                    {item.email}
                  </td>
                  <td className="p-4 font-bold">{item.Business}</td>
                  <td className="p-4">{item.prefix}</td>
                  <td className="p-4">{item.phone}</td>
                  <td className="p-4 text-gray-400 text-xl">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-dark-700 p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Add New Contact</h2>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <input
              type="text"
              placeholder="Business"
              value={form.Business}
              onChange={(e) => setForm({ ...form, Business: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <input
              type="number"
              placeholder="Prefix"
              value={form.prefix}
              onChange={(e) => setForm({ ...form, prefix: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <input
              type="number"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setContacts([
                    ...contacts,
                    {
                      ...form,
                      prefix: Number(form.prefix),
                      phone: Number(form.phone),
                    },
                  ]);
                  setShowModal(false);
                  setForm({
                    name: "",
                    email: "",
                    Business: "",
                    prefix: "",
                    phone: "",
                  });
                }}                
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}