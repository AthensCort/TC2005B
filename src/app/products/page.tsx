'use client'
import Sidebar from "@/components/sidebar/page";
import { useState, useEffect } from "react";
interface Product {
  nombre: string,
  precio: number,
  stock: number,
  url?: string,
}
export default function Home() {
  useEffect(()=>{
    fetch("http://localhost:8080/api/productoServicio")
    .then(res => res.json())
    .then(data => {setProduct(data)})
  })
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<Product[]>([]);
  
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    photo: "",
  });

  return (
    <div className="h-screen w-full flex bg-[#07101d]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-dark p-6 text-white overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold pl-8 mt-5">Products</h1>
          <button 
          onClick={() => setShowModal(true)}
          className="bg-[#1877f2] hover:bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center mt-5 mr-16">
            Add Product <span className="ml-5">+</span>
          </button>
        </div>

        {/* Grid Layout for product */}
        <div className="flex flex-wrap gap-4">
        {product.map((item, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-xl flex flex-col space-y-2">
            {/* Profile and Name */}
            <div className="flex items-center space-x-4 mb-2"> {/* Use flex-row to align items horizontally */}
                <img
                src={item.url} // The photo URL from the state
                alt={item.nombre}   // Alt text for the image (could be the name)
                className="w-16 h-32 rounded-lg object-cover" // Image size and rounded corners
                />
            <div className="flex flex-col space-y-2">
            <p className="text-white text-sm">Name: <span className="text-gray-400">{item.nombre}</span></p>
            <p className="text-white text-sm">Stock: <span className="text-gray-400">{item.stock}</span></p>
            <p className="text-white text-sm">precio: <span className="text-gray-400">{item.precio}</span></p>
            </div>

            </div>
            </div>
        ))}
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
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <input
              type="price"
              placeholder="price"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <input
              type="text"
              placeholder="stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full p-2 rounded bg-dark-600 text-white"
            />
            <input
              type="number"
              placeholder="photo"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
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
                    setProduct([
                    ...product,
                    {
                        ...form,
                        precio: parseFloat(form.precio),
                        stock: parseInt(form.stock),
                    },
                    ]);
                    setShowModal(false);
                    setForm({
                    nombre: "",
                    precio: "",
                    stock: "",
                    photo: "",
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
