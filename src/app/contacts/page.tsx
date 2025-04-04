import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css";
import { FaRegEnvelope } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-screen w-full flex bg-[#0d1117]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-dark p-6 text-white overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Negotiation List</h1>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
            Add Negotiation <span className="ml-2">+</span>
          </button>
        </div>

        {/* Table */}
        <div className={`${styles.tableContainer} bg-dark-700 p-4 rounded-lg`}>
          <table className="w-full text-left">
            {/* Table Head */}
            <thead>
              <tr className="text-gray-400">
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Preference Gender</th>
                <th></th>
              </tr>
            </thead>

            {/* Table Body */}
            <div className="space-y-4 w-full px-2">
  {[
    { name: "company name", email: "example@gmail.com", location: "New York" },
    { name: "company name", email: "example@gmail.com", location: "Monterrey"},
    { name: "company name", email: "example@gmail.com", location: "Paris"},
    { name: "company name", email: "example@gmail.com", location: "Salvador"},
    { name: "company name", email: "example@gmail.com", location: "Venice"},
    { name: "company name", email: "example@gmail.com", location: "Lisbon"},
    { name: "company name", email: "example@gmail.com", location: "Toronto"},
    { name: "company name", email: "example@gmail.com", location: "Schaumburg"},
  ].map((item, index) => (
    <div
      key={index}
      className="bg-[#161b22] p-3 rounded-xl flex items-center justify-between w-[1100px]"
    >
      {/* Left Side: Profile + Name/Email */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-purple-500"></div>
        <div>
          <p className="font-medium text-white text-lg">{item.name}</p>
          <p className="text-gray-400 text-sm flex items-center">
            <FaRegEnvelope className="mr-2" />
            {item.email}
          </p>
        </div>
      </div>

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
