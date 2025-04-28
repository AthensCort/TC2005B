'use client'
import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css";
import { useState, useEffect} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import SearchBar from "@/components/search_bar/page"; // ajusta el path si no es correcto
import { HiOutlineDotsVertical } from "react-icons/hi"; // Icono de 3 puntitos
import { motion, AnimatePresence } from "framer-motion";


export default function LeadFlow() {
  //NORMAL FORM
  // Define the necessary types for your form
interface Negotiation {
  user: string;
  client: string;
  state: string;
  affair: string;
  description: string;
  date: string;
  commission: string;
  products: { product: string; amount: number }[];  // Added product field
}

  //VALIDACION CREACION DE NEGOCIACIONES

  
  // Combined Validation Function
const isFormValid = () => {
  // Check if you are editing or adding a negotiation
  const targetForm = isEditing ? editingNegotiation : form;

  const areProductsValid = targetForm.products.every(
    (item: { product: string; amount: number }) => item.product !== "" && item.amount !== 0
  );

  return (
    targetForm.user !== "" &&
    targetForm.client !== "" &&
    targetForm.state !== "" &&
    targetForm.affair !== "" &&
    targetForm.description !== "" &&
    targetForm.date !== "" &&
    targetForm.commission !== "" &&
    areProductsValid
  );
};


  //ESTADO DE RESET

    // Reset the form to initial values
    const resetForm = () => {
      setForm({
        user: "",
        client: "",
        state: "",
        affair: "",
        description: "",
        date: "",
        commission: "",
        products: [{ product: "", amount: 0 }]
      });
    };

    //MODAL HACER NUEVO
    const openModal = () => {
      resetForm(); // Reset form when modal is opened
      setShowModal(true); // Show the modal
    };

  //INTERFACE DE LAS EMPRESAS
  interface Empresa {
    id?: number;
    nombre: string;
    industria: string;
    preferencias: string;
  }
  //LLAMADA A ALS EMPRESAS DESDE LE API, LOL
  const [companies, setCompanies] = useState<Empresa[]>([]);
      useEffect(() => {
        fetch("http://localhost:8080/api/empresa")
          .then((res) => res.json())
          .then((data) => setCompanies(data));
      }, []);


  //ESTIPULACION Y LLAMADA D EPRODUCTOS
  interface Product {
    nombre: string,
    precio: number,
    stock: number,
    url?: string,
  }
  const [products, setProducts] = useState<Product[]>([]);

      useEffect(() => {
        fetch("http://localhost:8080/api/productoServicio")
          .then((res) => res.json())
          .then((data) => setProducts(data));
      }, []);

  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState<Negotiation[]>([
    {
      user: "Carlos Mendoza",
      client: "Tech Solutions",
      state: "Starting",
      affair: "Initial Contact",
      description: "Reached out to discuss potential collaboration",
      date: "2025-04-10",
      commission: "$500",
      products:[{
        product: "Platform A",
        amount: 120
      }]
    },
    {
      user: "Laura García",
      client: "InnovaCorp",
      state: "Middle Stage",
      affair: "Product Presentation",
      description: "Showed platform demo and features",
      date: "2025-04-11",
      commission: "$1,200",
      products:[{
        product: "Platform A",
        amount: 120
      }]
    },
    {
      user: "Luis Torres",
      client: "GlobalWare",
      state: "Finish Stage",
      affair: "Final Negotiations",
      description: "Discussing terms before closing",
      date: "2025-04-12",
      commission: "$2,000",
      products:[{
        product: "Platform A",
        amount: 120
      }]
    },
    {
      user: "Maria magdalena",
      client: "BTICH",
      state: "Starting",
      affair: "Final Negotiations",
      description: "Discussing terms before closing",
      date: "2025-04-12",
      commission: "$2,000",
      products:[
        {product: "Platform A",amount: 120},
        { product: "TRAPECIO", amount: 100 }
      
      ]
    },
  ]);

  

  const [form, setForm] = useState({
    user: "",
    client: "",
    state: "",
    affair: "",
    description: "",
    date: "",
    commission: "",
    products: [{ product: "", amount: 0 }]
  });

  const [expandedCard, setExpandedCard] = useState<{ [key: string]: boolean }>({});
  const [reportPopup, setReportPopup] = useState<string | null>(null);

  const stages = [
    "Starting",
    "Middle Stage",
    "Finish Stage",
    "Close Won",
    "Close Lost",
  ];

  const handleToggleCard = (key: string) => {
    setExpandedCard((prev) => ({
      ...Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])),
      [key]: !prev[key],
    }));
  };

  //MODIFICA EL DRAG PARA CAMBIAR EL ESTADO Y LA POSICION ENTE LA MISMA COLUMNA
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
  
    const { source, destination, draggableId } = result;
  
    setContacts((prev) => {
      // Find the dragged contact
      const draggedContact = prev.find((contact) => {
        const cardKey = `${contact.client}-${contact.user}-${contact.date}`;
        return cardKey === draggableId;
      });
  
      if (!draggedContact) return prev;
  
      // Remove it from old place
      let newContacts = [...prev].filter((contact) => {
        const cardKey = `${contact.client}-${contact.user}-${contact.date}`;
        return cardKey !== draggableId;
      });
  
      // Update its state to new stage
      const updatedContact = { ...draggedContact, state: destination.droppableId };
  
      // Build the new list for that stage
      const contactsInDestinationStage = newContacts.filter(
        (c) => c.state === destination.droppableId
      );
  
      // Find the correct index to insert
      const before = newContacts.filter((c) => c.state !== destination.droppableId);
      const after = [
        ...contactsInDestinationStage.slice(0, destination.index),
        updatedContact,
        ...contactsInDestinationStage.slice(destination.index),
      ];
  
      return [...before, ...after];
    });
  };

    //IMPLEMENTACION DE AI PARA EL REPORTE DE NEGOCIOS
  const generateReport = async () => {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBycft2U9zo4J4-AUFUeHvKpjRgkSQGjvA';

    const payload = {
      contents: [{
        parts: [{
          text: `Summarize this data: ${JSON.stringify(contacts)}`,
        }],
      }],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resp = await response.json();
      const summary = resp.candidates[0]?.content?.parts[0]?.text || "No summary available.";
      setReportPopup(summary);
    } catch (error) {
      console.error("Error generating report:", error);
      setReportPopup("Failed to generate report.");
    }
  };
  const [searchValue, setSearchValue] = useState("");

  //IMPLEMENTACION DE BARRA DE BUSQUEDA
const handleSearch = () => {
  // Aquí no necesitas hacer nada porque vamos a filtrar en el render.
};


const [contactToDelete, setContactToDelete] = useState<string | null>(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//EDIT THE NEGOTIATIONS
const [activeMenu, setActiveMenu] = useState<string | null>(null);
const [editingNegotiation, setEditingNegotiation] = useState<any | null>(null);
const [isEditing, setIsEditing] = useState(false);


const handleSaveEditedNegotiation = (updatedNegotiation: any) => {
  setContacts((prev) =>
    prev.map((contact) => {
      if (
        contact.user === updatedNegotiation.user &&
        contact.client === updatedNegotiation.client &&
        contact.date === updatedNegotiation.date
      ) {
        return {
          ...contact, // Copy the existing contact
          ...updatedNegotiation, // Overwrite with updated negotiation data
          // state: contact.state, // Optional: If state is not changing, you don't need to include it here
        };
      }
      return contact;
    })
  );
};

const handleDeleteNegotiation = (cardKey: string) => {
  setContacts((prev) =>
    prev.filter((contact) => {
      const key = `${contact.client}-${contact.user}-${contact.date}`;
      return key !== cardKey;
    })
  );
  setIsDeleteModalOpen(false);
};


const handleSaveNegotiation = () => {
  if (isFormValid()) {
    const newNegotiation = {
      ...form,
      commission: `$${form.commission}`, // Format commission
      products: form.products.map(product => ({
        product: product.product,
        amount: product.amount,
      })),
    };

    if (isEditing) {
      handleSaveEditedNegotiation(newNegotiation);
    } else {
      setContacts((prev) => [...prev, newNegotiation]);
    }
    setShowModal(false);
    setIsEditing(false);
  } else {
    alert("Please fill out all fields!");
  }
};




return (
  <div className={`${styles.container} bg-[#07101d]`}>
    <Sidebar />
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className="text-6xl font-dangrek ml-10 mt-10">KANBAN</h1>
      </div>

      <div className={`${styles.filters} flex justify-between items-center px-10`}>
        <SearchBar
          value={searchValue}
          onChange={(val) => setSearchValue(val)}
          onSearch={handleSearch}
        />

        <div className="flex space-x-4">
          <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg">
            Color Filter
          </button>
          <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg">
            Save changes
          </button>
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
            onClick={generateReport}
          >
            Generate Report AI
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={`${styles.pipeline} mt-8 ml-8 overflow-y-auto`}>
          {stages.map((stage) => (
            <div className={styles.stage} key={stage}>
              <h3 className="font-bold text-purple-300">{stage}</h3>

              <Droppable droppableId={stage}>
                {(provided) => (
                  <div
                    className={styles.cardList}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {contacts
                      .filter((c) => c.state === stage)
                      .filter((c) =>
                        c.client.toLowerCase().includes(searchValue.toLowerCase()) ||
                        c.affair.toLowerCase().includes(searchValue.toLowerCase())
                      )
                      .map((contact, i) => {
                        const cardKey = `${contact.client}-${contact.user}-${contact.date}`;
                        return (
                          <Draggable draggableId={cardKey} index={i} key={cardKey}>
                            {(provided) => (
                              <div
                                className={`${styles.card} ${expandedCard[cardKey] ? styles.expanded : ""}`}
                                onClick={() => handleToggleCard(cardKey)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >

                              <div className="absolute top-2 right-2">
                                <div className="relative">
                                <HiOutlineDotsVertical
        onClick={(e) => {
          e.stopPropagation();
          setActiveMenu((prevMenu) => (prevMenu === cardKey ? null : cardKey));  // Togglear el menú
        }}
        className="text-purple-300 hover:text-purple-400 cursor-pointer"
      />

      {activeMenu === cardKey && (
        <div className="menu-container absolute right-0 mt-2 w-32 bg-[#1e1b3a] text-white rounded shadow-md z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingNegotiation(contact);
              setIsEditing(true);
              setActiveMenu(null);  // Cerrar el menú después de editar
            }}
            className="block w-full text-left px-4 py-2 hover:bg-purple-700"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setContactToDelete(cardKey);
              setIsDeleteModalOpen(true);
              setActiveMenu(null);  // Cerrar el menú después de eliminar
            }}
            className="block w-full text-left px-4 py-2 hover:bg-red-700 text-red-300"
          >
            Delete
          </button>
          {contact.state === "Close Won" && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Lógica para manejar el envío de la factura
          alert("Invoice action triggered");
          setActiveMenu(null);  // Cerrar el menú después de hacer clic en "Invoice"
        }}
        className="block w-full text-left px-4 py-2 hover:bg-green-700 text-green-300"
      >
        Invoice
      </button>
    )}
        </div>
                                  )}
                                </div>
                              </div>



                                <div className={styles.cardTitle}>{contact.affair}</div>
                                <div className={styles.cardDetails}>
                                  <span className={styles.date}>{contact.client}</span>
                                  <span className={styles.amount}>{contact.commission}</span>
    
                                </div>
                                <div className={styles.meta}>
                                  <small>{contact.user} - {contact.date}</small>
                                </div>
                           {expandedCard[cardKey] && (   
                            <div className="space-y-1 mt-6">
                        {/* Description */}
                        <div>
                          <small className="block font-semibold text-gray-400 mt:6">Description:</small>
                          <small className={`${styles.date} mt-1 block`}>{contact.description}</small>
                        </div>

                        {/* Product and Amount */}
                        <div className="flex justify-between mt-4">
                          <small className="font-semibold text-gray-400">Product:</small>
                          <small className="font-semibold text-gray-400">Amount:</small>
                        </div>

                        
                        {contact.products.map((item, index) => (
                      <div key={index} className="flex justify-between mt-1">
                        <small className={`${styles.product}`}>{item.product}</small>
                        <small className="font-medium">{item.amount}</small>
                      </div>
                    ))}
                  </div>      
                          )}
                                <div className={`${styles.colorTags} mt-4`}>
                                <span className={styles.tag}></span>
                                <span className={styles.tag}></span>
                                <span className={styles.tag}></span>
                              </div>

                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                    
                    {/* EMPTY STAGE PLACEHOLDER */}
                    {contacts
                      .filter((c) => c.state === stage)
                      .filter((c) =>
                        c.client.toLowerCase().includes(searchValue.toLowerCase()) ||
                        c.affair.toLowerCase().includes(searchValue.toLowerCase())
                      ).length === 0 && (
                        <div className={styles.emptyDropArea}></div>

                      )}
                  </div>
                  
                )}
              </Droppable>
            </div>
            
          ))}
        </div>
      </DragDropContext>

      <AnimatePresence>
  {isEditing && editingNegotiation && (
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
  <h3 className="text-lg text-purple-300 mb-4">Edit Negotiation</h3>

  {/* Editable fields */}
  {["user", "affair", "description", "date", "commission"].map((field) => (
    <div key={field} className="mb-4">
      <label className="block text-sm font-semibold mb-1 capitalize">{field}:</label>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={editingNegotiation[field]}
        onChange={(e) =>
          setEditingNegotiation({ ...editingNegotiation, [field]: e.target.value })
        }
      />
    </div>
  ))}

  {/* Client select dropdown */}
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-1">Client:</label>
    <select
      value={editingNegotiation.client}
      onChange={(e) =>
        setEditingNegotiation({ ...editingNegotiation, client: e.target.value })
      }
      className="w-full p-2 rounded bg-gray-700 text-white"
    >
      <option value="" disabled>Select Company</option>
      {companies.map((company) => (
        <option key={company.id} value={company.nombre}>
          {company.nombre}
        </option>
      ))}
    </select>
  </div>

  <div className="space-y-4">
  {form.products.map((item, index) => (
    <div key={index} className="flex items-center justify-between space-x-4">
      
      {/* PRODUCT SELECT */}
      <div className="flex flex-col w-full">
        <label className="block text-sm font-semibold mb-1 text-gray-400">Product:</label>
        <select
          value={item.product}
          onChange={(e) => {
            const updatedProducts = [...form.products];
            updatedProducts[index].product = e.target.value;
            setForm({ ...form, products: updatedProducts });
          }}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="" disabled>Select Product</option>
          {products.map((product) => (
            <option key={product.nombre} value={product.nombre}>
              {product.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* AMOUNT INPUT */}
      <div className="flex flex-col w-full">
        <label className="block text-sm font-semibold mb-1 text-gray-400">Amount:</label>
        <input
          type="number"
          value={item.amount}
          onChange={(e) => {
            const updatedProducts = [...form.products];
            updatedProducts[index].amount = Number(e.target.value);
            setForm({ ...form, products: updatedProducts });
          }}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      {/* REMOVE BUTTON */}
      <button
        type="button"
        onClick={() => {
          const updatedProducts = form.products.filter((_, i) => i !== index);
          setForm({ ...form, products: updatedProducts });
        }}
        className="text-red-500 text-sm"
      >
        Remove
      </button>

    </div>
  ))}

  {/* ADD PRODUCT BUTTON */}
  <button
    type="button"
    onClick={() => {
      setForm({
        ...form,
        products: [...form.products, { product: "", amount: 0 }]
      });
    }}
    className="text-blue-500 text-sm"
  >
    Add Product
  </button>
</div>


  <div className="flex justify-end gap-4">
    <button
      onClick={() => setIsEditing(false)}
      className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
    >
      Cancel
    </button>
    <button
  onClick={() => {
    if (isFormValid()) {
      handleSaveEditedNegotiation(editingNegotiation);
      setIsEditing(false);
    } else {
      alert("Please fill out all fields!");
    }
  }}
  disabled={!isFormValid()}  // Disable if form is invalid
  className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500"
>
  Save
</button>

  </div>
</motion.div>

    </motion.div>
  )}
</AnimatePresence>

      </div>

      {/* Floating Plus Button */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-10 w-14 h-14 bg-purple-700 text-white text-3xl rounded-full shadow-lg flex items-center justify-center hover:bg-purple-800 transition-all z-50"
      >
        +
      </button>
      {isDeleteModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-[#1e1b3a] p-6 rounded-xl shadow-xl w-full max-w-sm text-white">
      <h3 className="text-lg text-red-400 mb-4">Delete Negotiation?</h3>
      <p className="text-sm mb-6">This action cannot be undone.</p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
  onClick={() => {
    if (contactToDelete) {
      handleDeleteNegotiation(contactToDelete);
    }
  }}
  className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
>
  Delete
</button>

      </div>
    </div>
  </div>
)}


      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-[#1c1c2c] p-6 rounded-lg w-[400px] space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Add New Negotiation</h2>

      {/* User Input */}
      <input
        type="text"
        placeholder="User"
        value={form.user}
        onChange={(e) => setForm({ ...form, user: e.target.value })}
        className="w-full p-2 rounded bg-[#2c2c3c] text-white"
      />

      {/* Select Company */}
      <select
        value={form.client}
        onChange={(e) => setForm({ ...form, client: e.target.value })}
        className="w-full p-2 rounded bg-[#2c2c3c] text-white"
      >
        <option value="" disabled>Select Company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.nombre}>
            {company.nombre}
          </option>
        ))}
      </select>

      {/* Select Stage */}
      <select
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
        className="w-full p-2 rounded bg-[#2c2c3c] text-white"
      >
        <option value="" disabled>Select State</option>
        {stages.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>

      {/* Affair */}
      <input
        type="text"
        placeholder="Affair"
        value={form.affair}
        onChange={(e) => setForm({ ...form, affair: e.target.value })}
        className="w-full p-2 rounded bg-[#2c2c3c] text-white"
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-2 rounded bg-[#2c2c3c] text-white"
      />

      {/* Date */}
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full p-2 rounded bg-[#2c2c3c] text-white"
      />

      {/* Commission */}
      <input
        type="number"
        placeholder="Commission"
        value={form.commission}
        onChange={(e) => setForm({ ...form, commission: e.target.value })}
        className="w-full p-2 rounded bg-[#2c2c3c] text-white"
      />

      {/* Products and Amounts */}
      <div className="space-y-4">
        {form.products.map((item, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex flex-col w-full">
              <label className="block font-semibold text-gray-400">Product:</label>
              <select
                value={item.product}
                onChange={(e) => {
                  const updatedProducts = [...form.products];
                  updatedProducts[index].product = e.target.value;
                  setForm({ ...form, products: updatedProducts });
                }}
                className="w-full p-2 rounded bg-[#2c2c3c] text-white"
              >
                <option value="" disabled>Select Product</option>
                {products.map((product) => (
                  <option key={product.nombre} value={product.nombre}>
                    {product.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-end w-full">
              <label className="block font-semibold text-gray-400">Amount:</label>
              <input
                type="number"
                value={item.amount}
                onChange={(e) => {
                  const updatedProducts = [...form.products];
                  updatedProducts[index].amount = Number(e.target.value);
                  setForm({ ...form, products: updatedProducts });
                }}
                className="p-2 rounded bg-[#2c2c3c] text-white"
              />
            </div>
            <button
              onClick={() => {
                const updatedProducts = form.products.filter((_, i) => i !== index);
                setForm({ ...form, products: updatedProducts });
              }}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Button to add a new product */}
        <button
          onClick={() => {
            setForm({
              ...form,
              products: [...form.products, { product: "", amount: 0 }] // Add a new empty product
            });
          }}
          className="text-blue-500"
        >
          Add Product
        </button>
      </div>

      {/* Modal Buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 bg-gray-500 rounded text-white"
        >
          Cancel
        </button>
              <button
  onClick={() => {
    if (isFormValid()) {
      handleSaveNegotiation();
      setShowModal(false);
    } else {
      alert("Please fill out all fields!");
    }
  }}
  disabled={!isFormValid()}  // Disable if form is invalid
  className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-500 disabled:bg-gray-500"
>
  Save
</button>


            </div>
          </div>
        </div>
      )}

      {/* Report Popup */}
      {reportPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[600px] h-[500px] space-y-4"> {/* Increased width and added height */}
            <h2 className="text-2xl font-bold mb-4 text-black">AI Report</h2>
            <p className="text-black">{reportPopup}</p> {/* Add the "text-black" class */}
            <div className="flex justify-end">
              <button
                onClick={() => setReportPopup(null)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 transition rounded text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
