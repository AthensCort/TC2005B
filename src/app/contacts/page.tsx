'use client';
import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css";
import { FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([
    { name: "Alejandra Velazquez", email: "palomitas@hotmail.com", Business: "Bimbo", phone: "+558124300715" },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    Business: "",
    phone: "",
  });

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#07101d]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-dark p-4 md:p-6 text-white overflow-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold pl-2 md:pl-8">Contacts</h1>
          <div className="flex flex-col sm:flex-row gap-4 px-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#1877f2] hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              Add Contact <span className="ml-2">+</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#1877f2] hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
            >
              Save <span className="ml-2">+</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className={`${styles.tableContainer} bg-dark-700 p-4 rounded-lg overflow-x-auto`}>
          <table className="min-w-[600px] w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Business</th>
                <th className="p-2">Phone</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {contacts.map((item, index) => (
                <tr
                  key={index}
                  className="bg-gray-800 rounded-xl text-sm text-white hover:bg-gray-700 transition-all"
                >
                  <td className="p-2 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#1877f2]" />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-2 flex items-center">
                    <FaRegEnvelope className="mr-2 text-gray-400" />
                    {item.email}
                  </td>
                  <td className="p-2">{item.Business}</td>
                  <td className="p-2">{item.phone}</td>
                  <td className="p-2 text-right">
                    <button className="text-gray-400 text-xl">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-dark-700 p-6 rounded-lg w-full max-w-md space-y-4">
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
                  setContacts([...contacts, { ...form, phone: String(form.phone) }]);
                  setShowModal(false);
                  setForm({ name: "", email: "", Business: "", phone: "" });
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
