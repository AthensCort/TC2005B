'use client';
import Sidebar from "@/components/sidebar/page";
import { FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([
    { name: "Alejandra Velazquez", email: "palomitas@hotmail.com", Business: "Bimbo", phone: "+558124300715" },
    { name: "Carlos Pérez", email: "carlos@apple.com", Business: "Apple", phone: "+525588990011" },
    { name: "Lucía Morales", email: "lucia@google.com", Business: "Google", phone: "+524422337755" },
    { name: "Tomás Rivera", email: "tomas@tesla.com", Business: "Tesla", phone: "+527788665544" },
    { name: "Lucía Morales", email: "lucia@google.com", Business: "Google", phone: "+524422337755" },
    { name: "Tomás Rivera", email: "tomas@tesla.com", Business: "Tesla", phone: "+527788665544" },
    { name: "Lucía Morales", email: "lucia@google.com", Business: "Google", phone: "+524422337755" },
    
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    Business: "",
    phone: "",
  });

  const handleSave = () => {
    if (form.name && form.email && form.Business && form.phone) {
      setContacts([...contacts, { ...form }]);
      setShowModal(false);
      setForm({ name: "", email: "", Business: "", phone: "" });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#0b022b] to-[#4b0082]">
      <Sidebar />

      <div className="flex-1 p-6 text-gray-100 overflow-auto">
  {/* Header - SOLO el título */}
  <div className="ml-10 mb-4">
    <h1 className="text-3xl font-bold">Contacts</h1>
  </div>

  {/* Botones justo antes de la tabla */}
  <div className="flex flex-col sm:flex-row gap-4 ml-10 mb-6 mt-25 ml-240">
    <button
      onClick={() => setShowModal(true)}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md"
    >
      Add Contact +
    </button>
    <button
      onClick={handleSave}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md"
    >
      Save
    </button>
  </div>

        {/* Table */}
        <div className="bg-[#1e1b3a] p-4 rounded-xl shadow-lg overflow-x-auto max-w-6xl ml-8">
  <table className="min-w-[800px] w-full text-left text-sm">
    <thead>
      <tr className="text-purple-300">
        <th className="p-2">Name</th>
        <th className="p-2">Email</th>
        <th className="p-2">Business</th>
        <th className="p-2">Phone</th>
        <th className="p-2 text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {contacts.map((item, index) => (
        <tr key={index} className="hover:bg-[#2a2458] transition-colors">
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500" />
              {item.name}
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center gap-2 text-purple-300">
              <FaRegEnvelope />
              {item.email}
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">{item.Business}</td>
          <td className="p-2 whitespace-nowrap">{item.phone}</td>
          <td className="p-2 text-right whitespace-nowrap">
            <button className="text-purple-300 hover:text-white">⋮</button>
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
          <div className="bg-[#2e295f] p-6 rounded-lg w-full max-w-md space-y-4 text-white">
            <h2 className="text-2xl font-semibold">Add New Contact</h2>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="text"
              placeholder="Business"
              value={form.Business}
              onChange={(e) => setForm({ ...form, Business: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
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