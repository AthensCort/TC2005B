'use client';
import React from "react";
import Sidebar from "@/components/sidebar/page";
import { FaRegEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";
import SearchBar from "@/components/search_bar/page";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineDotsVertical } from "react-icons/hi"; // Icono de 3 puntitos

interface Contacto{
  id?:number,
  nombre:string,
  correo:string,
  telefono:string,
  empresa:string,
  url?:string | undefined
}
interface Empresa{ 
  id?:number,
  nombre:string,
  industria:string, 
  preferencias:string
}

export default function Home() {
  useEffect(()=>{
    fetch("http://localhost:8080/api/cliente")
    .then(res => res.json())
    .then(data => setContacts(data));
    
    fetch("http://localhost:8080/api/empresa")
    .then(res => res.json())
    .then(data => setCompanies(data));
    
    // Eu como corro esto CARO carolina carolina
  })/*woa un fetchwooooo, die potatoe die*/
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const [contacts, setContacts] = useState<Contacto[]>([]);

  const [companies, setCompanies] = useState<Empresa[]>([]);

  const [searchText, setSearchText] = useState("");
  const [companySearchText, setCompanySearchText] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleSearch = () => {
    return contacts.filter((contact) => {
      const matchesText = contact.nombre.toLowerCase().includes(searchText.toLowerCase());
      const matchesCompany = selectedCompanies.length === 0 || selectedCompanies.includes(contact.empresa);
      return matchesText && matchesCompany;
    });
  };

  const filteredContacts = handleSearch();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    empresa: "",
    telefono: "",
  });

  const [companyForm, setCompanyForm] = useState({
    nombre: "",
    industria: "",
    preferencias: "",
    photo: "",
  });


  interface CompaniesListProps {
    companies: Empresa[];
    companySearchText: string;
    setCompanySearchText: (value: string) => void;
  }
  

  const handleSave = () => {
    if (form.nombre && form.correo && form.empresa && form.telefono) {
      setContacts([...contacts, { ...form }]);
      setShowModal(false);
      setForm({ nombre: "", correo: "", empresa: "", telefono: "" });
    }
  };

  const handleSaveCompany = () => {
    if (companyForm.nombre && companyForm.industria && companyForm.preferencias) {
      setCompanies([...companies, { ...companyForm }]); /**/
      setCompanyModal(false)
      setCompanyForm({ nombre: "", industria: "", preferencias: "", photo: "" });
    }
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const getCompanyInfo = (name: string) => {
    return companies.find((c) => c.nombre === name);
  };

  //MODAL PARA PODER EDITAR A LOS CLIENTES CONSTANTES NECESARIAS
  const [isEditing, setIsEditing] = useState(false);  // For modal visibility
  const [editingContact, setEditingContact] = useState<Contacto | null>(null);  // For selected contact
  
  const handleEdit = (contact: Contacto) => {
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
 //bg-gradient-to-br from-[#0b022b] to-[#4b0082]


  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#07101d]">
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
                      key={company.nombre}
                      className={`cursor-pointer px-2 py-1 rounded hover:bg-purple-600 ${selectedCompanies.includes(company.nombre) ? 'bg-purple-700' : ''}`}
                      onClick={() => toggleCompany(company.nombre)}
                    >
                      {company.nombre}
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
              <th className="p-2">correo</th>
              <th className="p-2">empresa</th>
              <th className="p-1  ">telefono</th>
              <th className="p-1">Actions</th> {/* Nuevo */}
            </tr>
          </thead>
              <tbody>
  {filteredContacts.map((item, index) => {
    const isExpanded = expandedContact === item.correo;
    const companyInfo = getCompanyInfo(item.empresa);

    return (
      <React.Fragment key={index}>
        <tr
          className="hover:bg-[#2a2458] transition-colors cursor-pointer"
          onClick={() => setExpandedContact(isExpanded ? null : item.correo)}
        >
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500" />
              {item.nombre}
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center gap-2 text-purple-300">
              <FaRegEnvelope />
              {item.correo}
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">{item.empresa}</td>
          <td className="p-2 whitespace-nowrap">{item.telefono}</td>
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
                  <span className="font-bold text-purple-300">Industry:</span> {companyInfo.industria}
                  <span className="font-bold text-purple-300">Preference:</span> {companyInfo.preferencias}
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
        <p><span className="font-semibold">Nombre:</span> {editingContact.nombre}</p>
        <p><span className="font-semibold">Correo:</span> {editingContact.correo}</p>
        <p><span className="font-semibold">Telefono:</span> {editingContact.telefono}</p>

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
        company.nombre.toLowerCase().includes(companySearchText.toLowerCase())
      )
      .map((company) => (
        <div
          key={company.nombre}
          onClick={() =>
            setExpandedCompany((prev) => (prev === company.nombre ? null : company.nombre))
          }
          className="cursor-pointer"
        >
          <h3 className="text-white font-semibold">{company.nombre}</h3>
          <p className="text-sm text-purple-300">
            Industry: {company.industria}
          </p>
          <p
            className={`text-sm text-purple-300 ${
              expandedCompany === company.nombre ? "" : "truncate"
            }`}
          >
            Preference: {company.preferencias}
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
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="correo"
              placeholder="correo"
              value={form.correo}
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="text"
              placeholder="empresa"
              value={form.empresa}
              onChange={(e) => setForm({ ...form, empresa: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="tel"
              placeholder="telefono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
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
              value={companyForm.nombre}
              onChange={(e) => setCompanyForm({ ...companyForm, nombre: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="text"
              placeholder="Industry"
              value={companyForm.industria}
              onChange={(e) => setCompanyForm({ ...companyForm, industria: e.target.value })}
              className="w-full p-2 rounded bg-[#1c183a] text-white"
            />
            <input
              type="text"
              placeholder="Preference"
              value={companyForm.preferencias}
              onChange={(e) => setCompanyForm({ ...companyForm, preferencias: e.target.value })}
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
