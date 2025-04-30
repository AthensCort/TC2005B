'use client';
import Sidebar from "@/components/sidebar/page";
import SearchBar from "@/components/search_bar/page";
import { useState, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  url?: string;
}

interface CreateProduct {
  id?: number;
  nombre: string;
  precio: string;
  stock: string;
  photo?: File
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [form, setForm] = useState<CreateProduct>({
    id: undefined,
    nombre: "",
    precio: "",
    stock: "",
    photo: undefined,
  });


  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing a product or adding a new one

  useEffect(() => {
    fetch("http://localhost:8080/api/productoServicio")
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setFilteredProducts(data);
      });
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  const handleSearch = (query: string) => {
    const searchQuery = query.toLowerCase();
    const filtered = product.filter((item) =>
      item.nombre.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  };

  // Handle edit functionality
  const handleEdit = (item: Product) => {
    setForm({
      id: item.id,
      nombre: item.nombre,
      precio: String(item.precio),
      stock: String(item.stock),
      photo: undefined,
    });

    setIsEditing(true); // Set editing mode
    setShowModal(true);
    setActiveMenu(null);
  };

  // Handle delete functionality
  const handleDelete = (item: Product) => {
    setProduct((prevProducts) => prevProducts.filter((p) => p.nombre !== item.nombre));
    setFilteredProducts((prevProducts) => prevProducts.filter((p) => p.nombre !== item.nombre));
    fetch(`http://localhost:8080/api/productoServicio/${item.id}`, { method: "DELETE" })


    setActiveMenu(null);
  };

  const handleSaveEdit = async () => { // FALTA ASIGNAR EL URL TEMPORAL

    if (
      form
    ) {

      // Concatenate prefix and number to form the full phone number
      const formData = new FormData();
      if (form.nombre) formData.append("nombre", form.nombre);
      if (form.stock) formData.append("stock", form.stock);
      if (form.precio) formData.append("precio", form.precio);
      if (form.photo) {
        formData.append("productoImagen", form.photo); // Add url if it exists
      }

      let res;
      if (isEditing) {
        res = await fetch(`http://localhost:8080/api/productoServicio/${form.id}`,
          {
            method: "PUT",
            body: formData
          }
        );
      } else {
        res = await fetch(`http://localhost:8080/api/productoServicio`,
          {
            method: "POST",
            body: formData
          }
        );
      }

      const data = await res.json();
      setProduct((prevProducts) =>
        prevProducts.map((product) =>
          product.id === data.id
            ? { ...data, ...(form.photo ? { url: URL.createObjectURL(form.photo) } : {}) }
            : product)
      )

      if (isEditing) {
        const updatedProducts = product.map((p) =>
          p.id === data.id ? data : p
        );
        setProduct(updatedProducts);
        setFilteredProducts(updatedProducts);
      } else {
        const updatedProducts = [...product, data];
        setProduct(updatedProducts);
        setFilteredProducts(updatedProducts);
      }

      setShowModal(false);
      setIsEditing(false);

      fetch("http://localhost:8080/api/productoServicio")
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setFilteredProducts(data);
        });
    }
  };


  const handleAddNew = () => {
    setForm({ nombre: "", precio: "", stock: "", photo: undefined }); // Reset form for new product
    setIsEditing(false); // Set to add mode
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-[#0f111a] text-[#e5e7eb]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-6xl font-dangrek ml-10 mt-10">PRODUCTS</h1>
            <button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full flex items-center mt-5 mr-16 shadow-lg"
            >
              Add Product <span className="ml-3 text-2xl">+</span>
            </button>
          </div>

          {/* SearchBar */}
          <div className="mt-8 px-10">
            <SearchBar
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              onSearch={handleSearch}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap gap-6 p-4 ml-5">
          {filteredProducts.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1c29] border border-[#2c2e3f] p-4 rounded-2xl shadow-lg flex flex-col w-64 space-y-4 hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* Icono de 3 puntos */}
              <div className="absolute top-2 right-2">
                <HiOutlineDotsVertical
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === item.nombre ? null : item.nombre);
                  }}
                  className="text-purple-300 hover:text-purple-400 cursor-pointer"
                />

                {activeMenu === item.nombre && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#1e1b3a] text-white rounded shadow-md z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-purple-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-red-700 text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center space-y-3">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL_S3}${item.url}`} // Ensure we are using the actual product URL
                  alt={item.nombre}
                  className="w-32 h-32 rounded-xl object-cover border-2 border-purple-500"
                />

                <div className="text-center space-y-2">
                  <p className="text-lg font-bold text-white">{item.nombre}</p>
                  <p className="text-sm text-purple-400">Stock: {item.stock}</p>
                  <p className="text-sm text-purple-400">Price: ${item.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-md">
          <div className="bg-[#1a1c29] p-8 rounded-2xl w-[400px] space-y-6 border border-[#2c2e3f] shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setForm({ ...form, photo: file });
                }
              }}
              className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setForm({
                    nombre: "",
                    precio: "",
                    stock: "",
                    photo: undefined,
                  });

                }}
                className="px-5 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!form.nombre || !form.precio || !form.stock}
                className={`px-5 py-2 rounded-full ${!form.nombre || !form.precio || !form.stock
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  } text-white transition-all`}
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
