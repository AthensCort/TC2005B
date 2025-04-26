'use client';
import React from "react";
import Sidebar from "@/components/sidebar/page";
import { FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";
import SearchBar from "@/components/search_bar/page";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineDotsVertical } from "react-icons/hi"; // Icono de 3 puntitos



export default function Home() {

  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const [contacts, setContacts] = useState([
    { name: "Alejandra Velazquez", email: "palomitas@hotmail.com", Business: "Bimbo", phone: "+558124300715" },
    { name: "Carlos Pérez", email: "carlos@apple.com", Business: "Apple", phone: "+525588990011" },
    { name: "Lucía Morales", email: "lucia@google.com", Business: "Google", phone: "+524422337755" },
    { name: "Tomás Rivera", email: "tomas@tesla.com", Business: "Tesla", phone: "+527788665544" },
    { name: "Fernando Torres", email: "fer@apple.com", Business: "Apple", phone: "+527788661111" },
    { name: "Lucía Morales", email: "lucia@google.com", Business: "Google", phone: "+524422337755" },
    { name: "Tomás Rivera", email: "tomas@tesla.com", Business: "Tesla", phone: "+527788665544" },
    { name: "Fernando Torres", email: "fer@apple.com", Business: "Apple", phone: "+527788661111" },
   ]);

  const [companies, setCompanies] = useState([
    { name: "Bimbo", industry: "Bread", preferences: "Flour" },
    { name: "Apple", industry: "Technology", preferences: "Dejame robarte un bso que me llegue hasta el alma, como un ballenato de esos que nos gustabaaan, se que sientes mariposas, yo tambien senti sus alas" },
    { name: "Google", industry: "Technology", preferences: "Data Privacy" },
    { name: "Tesla", industry: "Automotive", preferences: "Sustainability" },
    { name: "Perla", industry: "Automotive", preferences: "Sustainability" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [companySearchText, setCompanySearchText] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleSearch = () => {
    return contacts.filter((contact) => {
      const matchesText = contact.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCompany = selectedCompanies.length === 0 || selectedCompanies.includes(contact.Business);
      return matchesText && matchesCompany;
    });
  };

  const filteredContacts = handleSearch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    Business: "",
    phone: "",
  });

  const [companyForm, setCompanyForm] = useState({
    name: "",
    industry: "",
    preferences: "",
    photo: "",
  });

  interface Company {
    name: string;
    industry: string;
    preferences: string;
    photo?: string;
  }

  type Contact = {
    name: string;
    email: string;
    Business: string;
    phone: string;
  };
  

  interface CompaniesListProps {
    companies: Company[];
    companySearchText: string;
    setCompanySearchText: (value: string) => void;
  }
  

  const handleSave = () => {
    if (form.name && form.email && form.Business && form.phone) {
      setContacts([...contacts, { ...form }]);
      setShowModal(false);
      setForm({ name: "", email: "", Business: "", phone: "" });
    }
  };

  const handleSaveCompany = () => {
    if (companyForm.name && companyForm.industry && companyForm.preferences) {
      setCompanies([...companies, { ...companyForm }]);
      setCompanyModal(false);
      setCompanyForm({ name: "", industry: "", preferences: "", photo: "" });
    }
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const getCompanyInfo = (name: string) => {
    return companies.find((c) => c.name === name);
  };

  //MODAL PARA PODER EDITAR A LOS CLIENTES CONSTANTES NECESARIAS
  const [isEditing, setIsEditing] = useState(false);  // For modal visibility
  const [editingContact, setEditingContact] = useState<Contact | null>(null);  // For selected contact
  
  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsEditing(true);  // Open modal when editing
  };
  
  const closeModal = () => {
    setIsEditing(false);  // Close modal
    setEditingContact(null);  // Clear contact
  };

  const handleSaveContact = () => {
    console.log("Guardar cambios:", editingContact);
    // Aquí podrías hacer la lógica para actualizar el contacto
    closeModal();
  };
  
 //LISTO AQUI SE CIERRA LAS FUNCIONES PARA EDITAR A LOS CLIENTES


  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#0b022b] to-[#4b0082]">
      <Sidebar />
      <div className="flex-1 p-6 text-gray-100 overflow-auto">
        <div className="ml-10 mb-4  pt-10">
          <h1 className="text-5xl font-dangrek">CONTACTS AND COMPANIES</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-15">
          <div className="flex-1 sm:flex-none sm:mr-auto ml-10">
            <SearchBar value={searchText} onChange={setSearchText} onSearch={() => {}} />
          </div>
          <div className="flex gap-2 items-center mr-10 relative">
            <div className="relative">
              <button
                className="flex items-center gap-1 bg-purple-700 px-3 py-2 rounded-md text-white hover:bg-purple-800"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Filter by Company <FaChevronDown />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-y-auto bg-[#2a2458] text-white rounded-md shadow-lg z-10 p-2">
                  {companies.map((company) => (
                    <div
                      key={company.name}
                      className={`cursor-pointer px-2 py-1 rounded hover:bg-purple-600 ${selectedCompanies.includes(company.name) ? 'bg-purple-700' : ''}`}
                      onClick={() => toggleCompany(company.name)}
                    >
                      {company.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md mr-48"
            >
              Add Contact +
            </button>
            <button
              onClick={() => setCompanyModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md -mr-8"
            >
              Add Company +
            </button>
          </div>
        </div>

        {selectedCompanies.length > 0 && (
          <div className="flex flex-wrap gap-2 ml-10 mb-6">
            {selectedCompanies.map((company) => (
              <div key={company} className="flex items-center bg-purple-700 text-white px-3 py-1 rounded-full">
                <span>{company}</span>
                <button
                  onClick={() => toggleCompany(company)}
                  className="ml-2 text-white hover:text-gray-300"
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="bg-[#1e1b3a] p-4 rounded-xl shadow-lg overflow-x-auto w-full max-w-5xl ml-10 max-h-[400px] overflow-y-auto">
            <h2 className="text-lg text-purple-300 mb-4">Contacts</h2>
            <table className="w-full text-left text-sm">
            <thead>
            <tr className="text-purple-300">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Business</th>
              <th className="p-1  ">Phone</th>
              <th className="p-1">Actions</th> {/* Nuevo */}
            </tr>
          </thead>
              <tbody>
  {filteredContacts.map((item, index) => {
    const isExpanded = expandedContact === item.email;
    const companyInfo = getCompanyInfo(item.Business);

    return (
      <React.Fragment key={index}>
        <tr
          className="hover:bg-[#2a2458] transition-colors cursor-pointer"
          onClick={() => setExpandedContact(isExpanded ? null : item.email)}
        >
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
          <td className="p-2 whitespace-nowrap">
            <div
              className="p-2 hover:bg-purple-700 rounded-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Evita que se expanda
                handleEdit(item); // Aquí va tu lógica para editar
              }}
            >
              <HiOutlineDotsVertical className="text-purple-300" />
            </div>
          </td>
        </tr>

        <AnimatePresence>
          {isExpanded && companyInfo && (
            <motion.tr
              className="bg-[#2a2458] text-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <td colSpan={5} className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <span className="font-bold text-purple-300">Industry:</span> {companyInfo.industry}
                  <span className="font-bold text-purple-300">Preference:</span> {companyInfo.preferences}
                </div>
              </td>
            </motion.tr>
          )}
        </AnimatePresence>
      </React.Fragment>
    );
  })}
</tbody>
            </table>

    <AnimatePresence>
  {isEditing && editingContact && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#1e1b3a] p-6 rounded-xl shadow-xl w-full max-w-md text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg text-purple-300 mb-4">Edit Contact</h3>
        <p><span className="font-semibold">Name:</span> {editingContact.name}</p>
        <p><span className="font-semibold">Email:</span> {editingContact.email}</p>
        <p><span className="font-semibold">Phone:</span> {editingContact.phone}</p>

        <button
          onClick={closeModal}
          className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

          </div>

  <div className="bg-[#1e1b3a] p-4 rounded-xl shadow-lg w-120 max-w-xs h-[400px] overflow-y-auto">
  <h2 className="text-lg text-purple-300 mb-4">Companies</h2>
  <div className="space-y-4">
    <SearchBar
      value={companySearchText}
      onChange={setCompanySearchText}
      onSearch={() => {}}
    />
    {companies
      .filter((company) =>
        company.name.toLowerCase().includes(companySearchText.toLowerCase())
      )
      .map((company) => (
        <div
          key={company.name}
          onClick={() =>
            setExpandedCompany((prev) => (prev === company.name ? null : company.name))
          }
          className="cursor-pointer"
        >
          <h3 className="text-white font-semibold">{company.name}</h3>
          <p className="text-sm text-purple-300">
            Industry: {company.industry}
          </p>
          <p
            className={`text-sm text-purple-300 ${
              expandedCompany === company.name ? "" : "truncate"
            }`}
          >
            Preference: {company.preferences}
          </p>
        </div>
      ))}
  </div>
</div>
        </div>
      </div>
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

      {companyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-[#2e295f] p-6 rounded-lg w-full max-w-md space-y-4 text-white">
            <h2 className="text-2xl font-semibold">Add New Company</h2>
            <input
              type="text"
              placeholder="Company Name"
              value={companyForm.name}
              onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="text"
              placeholder="Industry"
              value={companyForm.industry}
              onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="text"
              placeholder="Preference"
              value={companyForm.preferences}
              onChange={(e) => setCompanyForm({ ...companyForm, preferences: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={companyForm.photo}
              onChange={(e) => setCompanyForm({ ...companyForm, photo: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setCompanyModal(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCompany}
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
