import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css";
import { FaRegEnvelope } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-screen w-full flex bg-[#07101d]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-dark p-6 text-white overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold pl-8 mt-5">Contacts</h1>
          <button className="bg-[#1877f2] hover:bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center  mt-5 mr-16">
            Add Contact <span className="ml-5">+</span>
          </button>
        </div>

        {/* Table */}
        <div className={`${styles.tableContainer} bg-dark-700 p-4 rounded-lg`}>
          <tr className="text-gray-400 text-mm">
              <th className="p-4  pr-140">Name</th>
              <th className="p-4 pr-100">Email</th>
              <th className="p-4">Location</th>
            </tr>

          <table className="text-left">
            {/* Table Head */}
            {/* Table Body */}
            <div className="space-y-4 w-full px-2">
  {[
    { name: "Company name", email: "example@gmail.com", location: "New York" },
    { name: "Company name", email: "example@gmail.com", location: "Monterrey"},
    { name: "Company name", email: "example@gmail.com", location: "Paris"},
    { name: "Company name", email: "example@gmail.com", location: "Salvador"},
    { name: "Company name", email: "example@gmail.com", location: "Venice"},
    { name: "Company name", email: "example@gmail.com", location: "Lisbon"},
    { name: "Company name", email: "example@gmail.com", location: "Toronto"},
    { name: "Company name", email: "example@gmail.com", location: "Schaumburg"},
  ].map((item, index) => (
    <div
      key={index}
      className="bg-gray-800 p-3 rounded-xl flex items-center justify-between w-[1500px]"
    >
      {/* Left Side: Profile + Name/Email */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-[#1877f2]"></div>
        <div>
          <p className="text-white text-lg italic ">{item.name}</p>
        </div>
      </div>

      <td className="p-3">
      <p className="text-gray-400 text-sm flex items-center">
        <FaRegEnvelope className="mr-2 w-[16px]" />
        <span>{item.email}</span>
      </p>
    </td>

      {/* Location */}
      <p className="text-white">{item.location}</p>


      {/* More Options */}
      <button className="text-gray-400 text-xl">⋮</button>
    </div>
  ))}
</div>

          </table>  
        </div>
      </div>
    </div>
  );
}
