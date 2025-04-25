'use client';
import Sidebar from "@/components/sidebar/page";
import { FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "@/components/search_bar/page";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  // Estado de contactos
  const [contacts, setContacts] = useState([
    { name: "Alejandra Velazquez", email: "palomitas@hotmail.com", Business: "Bimbo", phone: "+558124300715" },
    { name: "Carlos Pérez", email: "carlos@apple.com", Business: "Apple", phone: "+525588990011" },
    { name: "Lucía Morales", email: "lucia@google.com", Business: "Google", phone: "+524422337755" },
    { name: "Tomás Rivera", email: "tomas@tesla.com", Business: "Tesla", phone: "+527788665544" },
  ]);

  // Estado de empresas con atributos adicionales
  const [companies, setCompanies] = useState([
    { name: "Bimbo", industry: "Food", preferences: "Sustainability" },
    { name: "Apple", industry: "Technology", preferences: "Innovation" },
    { name: "Google", industry: "Technology", preferences: "Data Privacy" },
    { name: "Tesla", industry: "Automotive", preferences: "Sustainability" },
  ]);

  // Estado de la búsqueda
  const [searchText, setSearchText] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  // Manejo de la búsqueda
  const handleSearch = () => {
    if (searchText === "") {
      setFilteredContacts(contacts);
      setFilteredCompanies(companies);
    } else {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredCompanies(
        companies.filter((company) =>
          company.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  // Manejo del formulario de contacto
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
    <div className="min-h-screen w-full flex bg-gradient-to-br from-[#0b022b] to-[#4b0082]">
      <Sidebar />

      <div className="flex-1 p-6 text-gray-100 overflow-auto">
        {/* Header */}
        <div className="ml-10 mb-4">
          <h1 className="text-3xl font-bold">Contacts & Companies</h1>
        </div>

        {/* Search and Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-25">
          <div className="flex-1 sm:flex-none sm:mr-auto ml-10">
            <SearchBar
              value={searchText}
              onChange={setSearchText}
              onSearch={handleSearch}
            />
          </div>
          <div className="flex gap-4 mr-110">
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
            >
              Add Contact +
            </button>
            <button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
            >
              Save
            </button>
          </div>
        </div>

        {/* Contenedor para la tabla de Contactos y el Rectángulo de Empresas */}
        <div className="flex gap-8">
          {/* Tabla de Contactos */}
          <div className="bg-[#1e1b3a] p-4 rounded-xl shadow-lg w-full max-w-5xl">
            <h2 className="text-lg text-purple-300 mb-4">Contacts</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-purple-300">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Business</th>
                  <th className="p-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((item, index) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rectángulo de Empresas a la derecha, ocupando toda la altura */}
      <div className="bg-[#1e1b3a] p-4 rounded-xl shadow-lg w-80 min-h-screen overflow-auto">
        <h2 className="text-lg text-purple-300 mb-4">Companies</h2>
        <div className="text-purple-300">
          {filteredCompanies.map((company, index) => (
            <div key={index} className="p-2">
              {company.name}
            </div>
          ))}
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
