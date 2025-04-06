'use client'
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
          className="bg-[#1877f2] hover:bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center  mt-5 mr-16">
            Add Contact <span className="ml-5">+</span>
          </button>
        </div>

        {/* Table */}
        <div className={`${styles.tableContainer} bg-dark-700 p-4 rounded-lg`}>
          <tr className="text-gray-400 text-mm">
              <th className="p-4 pr-80">Name</th>
              <th className="p-4 pr-45">Email</th>
              <th className="p-4 pr-44">Business</th>
              <th className="p-4">Phone</th>
            </tr>

          <table className="text-left">
            {/* Table Head */}
            {/* Table Body */}
            <div className="space-y-4 w-full px-2">
              {contacts.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-[300px_250px_150px_80px_10px_30px] bg-gray-800 p-3 rounded-xl flex items-center justify-between w-[1130px]"
    >
      {/* Left Side: Profile + Name/Email */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-[#1877f2]"></div>
        <div>
          <p className="text-white text-lg italic text-sm ">{item.name}</p>
        </div>
      </div>


      <p className="text-gray-400 text-sm flex items-center">
        <FaRegEnvelope className="mr-2 w-[16px]" />
        <span>{item.email}</span>
      </p>

      {/* Business */}
      <p className="text-white text-sm">{item.Business}</p>
      <p className="text-white text-sm">{item.phone}</p>

      {/* More Options */}
      <button className="text-gray-400 text-xl">⋮</button>
    </div>
  ))}
</div>

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
                      phone: String(form.phone),
                    },
                  ]);
                  setShowModal(false);
                  setForm({
                    name: "",
                    email: "",
                    Business: "",
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
