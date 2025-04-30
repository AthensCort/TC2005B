'use client'
import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import SearchBar from "@/components/search_bar/page";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns"
import ReactMarkdown from 'react-markdown';

// Normal Form
type Negociacion = {
  id?: number;
  usuario?: string;
  cliente?: string;
  estado?: string;
  idClientes?: number;
  idUsuarios?: number;
  idEstado?: number;
  asunto?: string;
  descripcion?: string;
  fecha?: string;
  comision?: number;
  total?: number;
  productos?: { nombre: string; cantidad: number }[];
} & {
  [key: string]: any;
};

type NegociacionReq = {
  id?: number;
  idUsuarios: string;
  idClientes: string;
  idEstado: string;
  asunto: string;
  descripcion: string;
  fecha: string;
  comision: number;
  total: number;
  productos?: { nombre: string; cantidad: number }[];
} & {
  [key: string]: any;
};


interface Empresa {
  id?: number;
  nombre: string;
  industria: string;
  preferencias: string;
}

interface Cliente {
  id: number,
  nombre: string,
  empresa: string,
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}
// @ts-ignore
let token;
export default function LeadFlow() {
  const [originalNegotiation, setOriginalNegotiation] = useState<Negociacion | null>(null);

  const [products, setProducts] = useState<Producto[]>([]);
  const [reqNegotiation, setReqNegotiation] = useState<NegociacionReq>();
  useEffect(() => {
    token = localStorage.getItem("token");


    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/productoServicio`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const [negotiations, setNegotiations] = useState<Negociacion[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/negociacion/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setNegotiations(data))
  }, []);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/usuario/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsuarios(data))
  }, []);

  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async (negotiationId: number) => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/negociacion/factura/${negotiationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${token}`,
      },
    });
    const factura = await res.json();

    try {
      if (!factura)
        throw new Error("No se pudo completar");

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 size

      const { height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Title Section
      const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      page.drawText('INVOICE', {
        x: 50,
        y: height - 50,
        size: 36,
        font: titleFont,
        color: rgb(0, 0, 0)
      });

      // Invoice Information
      const detailsFont = font;
      const fecha = factura?.fecha ? new Date(factura.fecha) : null;
      const formattedDate = fecha ? format(fecha, 'dd/MM/yyyy') : 'Fecha no válida';

      page.drawText(`Asunto: ${factura?.asunto}`, { x: 50, y: height - 100, size: 14, font: detailsFont });
      page.drawText(`Cliente: ${factura?.cliente}`, { x: 50, y: height - 120, size: 14, font: detailsFont });
      page.drawText(`Fecha: ${formattedDate}`, { x: 50, y: height - 140, size: 14, font: detailsFont });

      // Table Header (Products, Prices, Quantities)
      const tableTop = height - 180;
      const tableHeaderFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      page.drawText('Producto', { x: 50, y: tableTop, size: 12, font: tableHeaderFont });
      page.drawText('Precio Unitario', { x: 150, y: tableTop, size: 12, font: tableHeaderFont });
      page.drawText('Cantidad', { x: 250, y: tableTop, size: 12, font: tableHeaderFont });
      page.drawText('Subtotal', { x: 350, y: tableTop, size: 12, font: tableHeaderFont });

      // Table Content
      let yPosition = tableTop - 20;
      if (factura?.productos) {
        factura.productos.forEach((item: { nombre: string; precio: number; cantidad: number; id: number; }) => {
          page.drawText(item.nombre, { x: 50, y: yPosition, size: 12, font });
          page.drawText(`$${item.precio.toFixed(2)}`, { x: 150, y: yPosition, size: 12, font });
          page.drawText(`${item.cantidad}`, { x: 250, y: yPosition, size: 12, font });
          page.drawText(`$${(item.precio * item.cantidad).toFixed(2)}`, { x: 350, y: yPosition, size: 12, font });

          yPosition -= 20;
        });
      }

      // Commission and Total
      yPosition -= 20; // add some space
      const summaryFont = font;
      page.drawText(`Comisión: $${factura?.comision.toFixed(2)}`, { x: 50, y: yPosition, size: 14, font: summaryFont });
      page.drawText(`Total: $${factura?.total.toFixed(2)}`, { x: 50, y: yPosition - 20, size: 14, font: summaryFont });

      // Generate the PDF and Trigger Download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Factura_${factura?.asunto}.pdf`;

      // Trigger Download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    } catch (error) {
      console.error('Error generating PDF:', error);
    }

    setLoading(false);
  };

  const [form, setForm] = useState<Negociacion>({
    usuario: "",
    cliente: "",
    estado: "",
    asunto: "",
    descripcion: "",
    fecha: "",
    comision: 0,
    total: 0,
    productos: [{ nombre: "", cantidad: 0 }],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingNegotiation, setEditingNegotiation] = useState<Negociacion | null>(null);
  const [creatingNegotiation, setCreatingNegotation] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const isFormValid = () => {
    const targetForm = (isEditing || creatingNegotiation) ? editingNegotiation : form;
    if (!targetForm) return false;
    const areProductsValid = targetForm.productos!.every(
      (item) => item.nombre !== "" && item.cantidad !== 0
    );

    return (
      targetForm.usuario !== "" &&
      targetForm.cliente !== "" &&
      targetForm.estado !== "" &&
      targetForm.asunto !== "" &&
      targetForm.descripcion !== "" &&
      targetForm.fecha !== "" &&
      areProductsValid
    );
  };

  const resetForm = () => {
    setForm({
      usuario: "",
      cliente: "",
      estado: "",
      asunto: "",
      descripcion: "",
      fecha: "",
      comision: 0,
      total: 0,
      productos: [{ nombre: "", cantidad: 0 }],
    });
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };



  // LLAMADA A EMPRESAS
  const [companies, setCompanies] = useState<Empresa[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/empresa`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  const [clients, setClients] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/cliente`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setClients(data));
  })

  // LLAMADA A PRODUCTOS
  interface Producto {
    id: string,
    nombre: string,
    precio: number,
    stock: number,
    url?: string,
  }


  // EXPANSIÓN DE CARDS
  const [expandedCard, setExpandedCard] = useState<{ [key: string]: boolean }>({});

  // POPUP DE REPORTES
  const [reportPopup, setReportPopup] = useState<string | null>(null);

  // ETAPAS
  const etapas = [
    "Starting",
    "Middle Stage",
    "Finish Stage",
    "Close Won",
    "Close Lost",
  ];

  const etapaMap = {
    "Starting": 1,
    "Middle Stage": 2,
    "Finish Stage": 3,
    "Close Won": 4,
    "Close Lost": 5,
  };


  // FUNCION PARA EXPANDIR UNA TARJETA
  const handleToggleCard = (key: string) => {
    setExpandedCard((prev) => ({
      ...Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])),
      [key]: !prev[key],
    }));
  };

  // FUNCION PARA MANEJAR DRAG AND DROP
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;

    setNegotiations((prev) => {
      const negociacionArrastrada = prev.find((negociacion) => {
        const key = `${negociacion.cliente}-${negociacion.usuario}-${negociacion.fecha}`;
        return key === draggableId;
      });

      if (!negociacionArrastrada) return prev;

      const nuevasNegociaciones = [...prev].filter((negociacion) => {
        const key = `${negociacion.cliente}-${negociacion.usuario}-${negociacion.fecha}`;
        return key !== draggableId;
      });

      const negociacionActualizada = { ...negociacionArrastrada, estado: destination.droppableId };

      const negociacionesEnDestino = nuevasNegociaciones.filter(
        (n) => n.estado === destination.droppableId
      );

      const antes = nuevasNegociaciones.filter((n) => n.estado !== destination.droppableId);
      const despues = [
        ...negociacionesEnDestino.slice(0, destination.index),
        negociacionActualizada,
        ...negociacionesEnDestino.slice(destination.index),
      ];

      return [...antes, ...despues];
    });
  };
  // IMPLEMENTACION DE AI PARA EL REPORTE DE NEGOCIOS
  const generateReport = async () => {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBycft2U9zo4J4-AUFUeHvKpjRgkSQGjvA';

    const payload = {
      contents: [{
        parts: [{
          text: `Generate a short and professional CRM report using the following negotiation data:\n\n${JSON.stringify(negotiations)}`,
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

  // IMPLEMENTACION DE BARRA DE BUSQUEDA
  const handleSearch = () => {
    // Aquí no necesitas hacer nada porque vamos a filtrar en el render.
  };

  const [negotiationToDelete, setNegotiationToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // EDIT THE NEGOTIATIONS
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const handleSaveEditedNegotiation = async (updatedNegotiation: Negociacion) => {
    try {
      // Actualizar el estado local con la negociación editada
      setNegotiations((prev: Negociacion[]) =>
        prev.map((negotiation: Negociacion) => {
          if (
            negotiation.usuario === updatedNegotiation.usuario &&
            negotiation.cliente === updatedNegotiation.cliente &&
            negotiation.fecha === updatedNegotiation.fecha
          ) {
            // Hacer un POST al servidor para guardar la negociación editada
            fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/negociacion/`, {
              method: "POST", // Método POST para enviar datos
              headers: {
                "Content-Type": "application/json", // Especificar que los datos son en formato JSON
                // @ts-ignore
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(updatedNegotiation), // Pasar los datos como un string JSON
            })
              .then((response) => response.json()) // Obtener la respuesta en formato JSON
              .then((data) => {
                console.log("Negociación actualizada:", data);
              })
              .catch((error) => {
                console.error("Error al guardar la negociación:", error);
              });

            // Retornar la negociación actualizada en el estado
            return {
              ...negotiation, // Copiar la negociación existente
              ...updatedNegotiation, // Sobrescribir con los datos de la negociación editada
            };
          }
          return negotiation;
        })
      );
    } catch (error) {
      console.error("Error en handleSaveEditedNegotiation:", error);
    }
  };


  const handleDeleteNegotiation = (cardKey: string) => {
    setNegotiations((prev: Negociacion[]) =>
      prev.filter((negotiation: Negociacion) => {
        const key = `${negotiation.cliente}-${negotiation.usuario}-${negotiation.fecha}`;
        return key !== cardKey;
      })
    );
    setIsDeleteModalOpen(false);
  };

  const handleSaveNegotiation = () => {
    //if (isFormValid()) {

    if (creatingNegotiation) {
      const transformedProducts = form.productos!.map((item) => {
        const foundProduct = products.find((p: Producto) => p.nombre === item.nombre);
        if (!foundProduct) throw new Error(`Product ${item.nombre} not found`);

        return {
          cantidad: item.cantidad,
          productData: foundProduct
        };
      });

      setShowModal(false);
      setIsEditing(false);
      setCreatingNegotation(false);
      resetForm();

      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/negociacion/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Especificar que los datos son en formato JSON
          // @ts-ignore
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          negociacion: editingNegotiation, productos: { products: transformedProducts }
        }),
      })
        .then(res => res.json())
        .then(data => setNegotiations((prev) => [...prev, data]))
        .catch(error => console.log(error))

    } else if (isEditing) {
      const newNegotiation = {
        ...form,
        products: form.productos!.map(product => ({
          product: product.nombre,
          amount: product.cantidad,
        })),
      };

      handleSaveEditedNegotiation(newNegotiation);
    }
    // } else {
    //   alert("Please fill out all fields!");
    // }
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
            {etapas.map((etapa) => (
              <div className={styles.stage} key={etapa}>
                <h3 className="font-bold text-purple-300">{etapa}</h3>

                <Droppable droppableId={etapa}>
                  {(provided) => (
                    <div
                      className={styles.cardList}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {negotiations
                        .filter((n) => n.estado === etapa)
                        .filter((n) =>
                          n.cliente!.toLowerCase().includes(searchValue.toLowerCase()) ||
                          n.asunto!.toLowerCase().includes(searchValue.toLowerCase())
                        )
                        .map((negotiation, i) => {
                          const cardKey = `${negotiation.cliente}-${negotiation.usuario}-${negotiation.fecha}`;
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
                                              setOriginalNegotiation(negotiation);  // 🔥 Guarda copia original
                                              setEditingNegotiation(negotiation);
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
                                              setNegotiationToDelete(cardKey);
                                              setIsDeleteModalOpen(true);
                                              setActiveMenu(null);  // Cerrar el menú después de eliminar
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-red-700 text-red-300"
                                          >
                                            Delete
                                          </button>
                                          {negotiation.estado === "Close Won" && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleGeneratePDF(negotiation.id!); // Call the function to generate PDF
                                                setActiveMenu(null);  // Close the menu after clicking "Invoice"
                                              }}
                                              className="block w-full text-left px-4 py-2 hover:bg-green-700 text-green-300"
                                              disabled={loading} // Disable button if loading is true
                                            >
                                              {loading ? (
                                                <span>Loading...</span>  // You can replace this with a spinner or text
                                              ) : (
                                                'Invoice'  // Button text when not loading
                                              )}
                                            </button>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className={styles.cardTitle}>{negotiation.asunto}</div>
                                  <div className={styles.cardDetails}>
                                    <span className={styles.date}>{negotiation.cliente}</span>
                                  </div>
                                  <div className={styles.meta}>
                                    <small>{negotiation.usuario} - {negotiation.fecha}</small>
                                  </div>
                                  {expandedCard[cardKey] && (
                                    <div className="space-y-1 mt-6">
                                      {/* Description */}
                                      <div>
                                        <small className="block font-semibold text-gray-400 mt:6">Description:</small>
                                        <small className={`${styles.date} mt-1 block`}>{negotiation.descripcion}</small>
                                      </div>

                                      {/* Product and Amount */}
                                      <div className="flex justify-between mt-4">
                                        <small className="font-semibold text-gray-400">Product:</small>
                                        <small className="font-semibold text-gray-400">Amount:</small>
                                      </div>


                                      {/* @ts-ignore */}
                                      {negotiation.productos.map((item, index) => (
                                        <div key={index} className="flex justify-between mt-1">
                                          <small className={`${styles.product}`}>{item.nombre}</small>
                                          <small className="font-medium">{item.cantidad}</small>
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

                      {/* EMPTY etapa PLACEHOLDER */}
                      {negotiations
                        .filter((c) => c.estado === etapa)
                        .filter((c) =>
                          c.cliente!.toLowerCase().includes(searchValue.toLowerCase()) ||
                          c.asunto!.toLowerCase().includes(searchValue.toLowerCase())
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

                {(() => {
                  const stringFields = [
                    "estado",
                    "asunto",
                    "descripcion",
                    "fecha",
                  ];

                  // No pongas "productos" ni otros arrays aquí

                  return stringFields.map((field) => (
                    <div key={field} className="mb-4">
                      <label className="block text-sm font-semibold mb-1 capitalize">{field}:</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-700 text-white"

                        value={editingNegotiation?.[field] ?? ""}
                        onChange={(e) =>
                          editingNegotiation &&
                          setEditingNegotiation({ ...editingNegotiation, [field]: e.target.value })
                        }
                      />
                    </div>
                  ));
                })()}


                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">User:</label>
                  <select
                    value={editingNegotiation?.idUsuarios} // 👈 cambiamos a usuarioId
                    onChange={(e) => {
                      if (!editingNegotiation) return;
                      setEditingNegotiation({
                        ...editingNegotiation,
                        idUsuarios: Number(e.target.value), // 👈 guardamos el id, no el nombre
                      });
                    }}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  >
                    <option value="" disabled>Select User</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Client select dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Client:</label>
                  <select
                    value={editingNegotiation?.idClientes}
                    onChange={(e) => {
                      if (!editingNegotiation) return;
                      setEditingNegotiation({
                        ...editingNegotiation,
                        idClientes: Number(e.target.value),
                      });
                    }}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  >
                    <option value="" disabled>Select Client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.nombre}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Products Section */}
                <div className="space-y-4">
                  {editingNegotiation?.productos!.map((item, index) => (
                    <div key={index} className="flex items-center justify-between space-x-4">

                      {/* PRODUCT SELECT */}
                      <div className="flex flex-col w-full">
                        <label className="block text-sm font-semibold mb-1 text-gray-400">Product:</label>
                        <select
                          value={item.nombre}
                          onChange={(e) => {
                            if (!editingNegotiation) return;
                            const updatedProducts = [...editingNegotiation.productos!];
                            updatedProducts[index].nombre = e.target.value;
                            setEditingNegotiation({ ...editingNegotiation, productos: updatedProducts });
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
                          value={item.cantidad}
                          onChange={(e) => {
                            if (!editingNegotiation) return;
                            const updatedProducts = [...editingNegotiation.productos!];
                            updatedProducts[index].cantidad = Number(e.target.value);
                            setEditingNegotiation({ ...editingNegotiation, productos: updatedProducts });
                          }}
                          className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                      </div>

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingNegotiation) return;
                          const updatedProducts = editingNegotiation.productos!.filter((_, i) => i !== index);
                          setEditingNegotiation({ ...editingNegotiation, productos: updatedProducts });
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
                      if (!editingNegotiation) return;
                      setEditingNegotiation({
                        ...editingNegotiation,
                        productos: [...editingNegotiation.productos!, { nombre: "", cantidad: 0 }]
                      });
                    }}
                    className="text-blue-500 text-sm"
                  >
                    Add Product
                  </button>
                </div>

                {/* Save/Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (isFormValid()) {
                        const invalidProduct = editingNegotiation?.productos!.find((item) => {
                          const productInfo = products.find((p: Producto) => p.nombre === item.nombre);
                          return productInfo && item.cantidad > productInfo.stock;
                        });

                        if (invalidProduct) {
                          alert(`The amount for "${invalidProduct.nombre}" exceeds available stock.`);
                          return;
                        }
                            // @ts-ignore
                        const { productos, usuario, cliente, ...rest } = editingNegotiation;

                        // 🚀 TRANSFORMAMOS productos para que tengan cantidad y productData
                        const transformedProducts = productos!.map((item) => {
                          const foundProduct = products.find((p: Producto) => p.nombre === item.nombre);
                          if (!foundProduct) throw new Error(`Product ${item.nombre} not found`);

                          return {
                            cantidad: item.cantidad,
                            productData: foundProduct
                          };
                        });

                        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/negociacion/${editingNegotiation.id}`, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            // @ts-ignore
                            "Authorization": `Bearer ${token}`,

                          },
                          body: JSON.stringify({ negociacion: rest, productos: { products: transformedProducts } }),
                          //                ⬆️   OJO: debes mandar el objeto { products: [...] }
                        })
                          .then(res => res.json())
                          .then(data => setNegotiations(prev => [...prev, data]))
                          .catch(error => {
                            alert("There was an error saving the negotiation." + error);
                            setEditingNegotiation(originalNegotiation);
                          });

                        handleSaveEditedNegotiation(editingNegotiation);
                        setIsEditing(false);
                      }
                    }}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
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
        onClick={() => {
          setCreatingNegotation(true);
          setIsEditing(false);
          openModal()
        }}
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
                  if (negotiationToDelete) {
                    handleDeleteNegotiation(negotiationToDelete);
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

            {/* User Select */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">User:</label>
              <select
                value={
                  usuarios.find((u) => u.nombre === form.usuario)?.id || "" // convertir nombre a id para que coincida con el value del <option>
                }
                onChange={(e) => {
                  if (!creatingNegotiation) return;

                  const selectedUserId = Number(e.target.value);
                  const selectedUser = usuarios.find(user => user.id === selectedUserId);
                  if (!selectedUser) return;

                  setEditingNegotiation({
                    ...editingNegotiation,
                    idUsuarios: selectedUserId,
                  });

                  setForm({
                    ...form,
                    usuario: selectedUser.nombre, // guardar el nombre
                  });
                }}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="" disabled>Select User</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </select>
            </div>


            {/* Client Select */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Client:</label>
              <select
                value={editingNegotiation?.idClientes ?? ''}
                onChange={(e) => {
                  if (!creatingNegotiation) return;

                  const selectedClientId = Number(e.target.value);
                  const selectedClient = clients.find(client => client.id === selectedClientId);
                  if (!selectedClient) return;

                  setEditingNegotiation({
                    ...editingNegotiation,
                    idClientes: selectedClientId,
                  });

                  setForm({
                    ...form,
                    cliente: selectedClient.nombre,
                  });
                }}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="" disabled>Select Client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Select */}
            <select
              value={form.estado}
              onChange={(e) => {
                const nuevaEtapa = e.target.value;
                setForm({ ...form, estado: nuevaEtapa });
                setEditingNegotiation({
                  ...editingNegotiation,
                  idEstado: etapaMap[nuevaEtapa as keyof typeof etapaMap],
                });
              }}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            >
              <option value="" disabled>Select State</option>
              {etapas.map((etapa) => (
                <option key={etapa} value={etapa}>
                  {etapa}
                </option>
              ))}
            </select>

            {/* Affair */}
            <input
              type="text"
              placeholder="Affair"
              value={form.asunto}
              onChange={(e) => {
                setForm({ ...form, asunto: e.target.value })
                setEditingNegotiation({ ...editingNegotiation, asunto: e.target.value })
              }}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />

            {/* Description */}
            <textarea
              placeholder="Description"
              value={form.descripcion}
              onChange={(e) => {
                setForm({ ...form, descripcion: e.target.value })
                setEditingNegotiation({ ...editingNegotiation, descripcion: e.target.value })
              }}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />

            {/* Date */}
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => {
                setForm({ ...form, fecha: e.target.value })
                setEditingNegotiation({ ...editingNegotiation, fecha: e.target.value })

              }}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />

            {/* Products */}
            <div className="space-y-4">
              {form.productos!.map((item, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col w-full">
                    <label className="block font-semibold text-gray-400">Product:</label>
                    <select
                      value={item.nombre}
                      onChange={(e) => {
                        const updatedProducts = [...form.productos!];
                        updatedProducts[index].nombre = e.target.value;
                        setForm({ ...form, productos: updatedProducts });
                        setEditingNegotiation({ ...editingNegotiation, productos: updatedProducts });

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
                      value={item.cantidad}
                      onChange={(e) => {
                        const updatedProducts = [...form.productos!];
                        updatedProducts[index].cantidad = Number(e.target.value);
                        setForm({ ...form, productos: updatedProducts });
                        setEditingNegotiation({ ...editingNegotiation, productos: updatedProducts });

                      }}
                      className="p-2 rounded bg-[#2c2c3c] text-white"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const updatedProducts = form.productos!.filter((_, i) => i !== index);
                      setForm({ ...form, productos: updatedProducts });
                      const updatedProductsNeg = editingNegotiation!.productos!.filter((_, i) => i !== index);
                      setForm({ ...editingNegotiation, productos: updatedProductsNeg });
                    }}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                onClick={() => {
                  setForm({
                    ...form,
                    productos: [...form.productos!, { nombre: '', cantidad: 0 }]
                  });
                  setEditingNegotiation({
                    ...editingNegotiation,
                    productos: [...editingNegotiation!.productos!, { nombre: '', cantidad: 0 }]
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
                  if (/*isFormValid()*/ true) {
                    handleSaveNegotiation();
                    setShowModal(false);
                  } else {
                    alert('Please fill out all fields!');
                  }
                }}
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
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto space-y-4 text-black">
            <h2 className="text-2xl font-bold mb-4">AI Report</h2>

            <div className="prose prose-sm max-w-none text-black">
              <ReactMarkdown>{reportPopup}</ReactMarkdown>
            </div>

            {/* Botón de cierre */}
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
