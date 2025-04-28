'use client';
import Sidebar from "@/components/sidebar/page";
import { useState } from "react";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";

interface SettingsOption {
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    // In a real application, you would send this data to your backend
    console.log("Changing password:", { oldPassword, newPassword });
    setMessage("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-4">
      <input
        type="password"
        placeholder="Old Password"
        className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <button
        onClick={handleChangePassword}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg transition-all"
      >
        Change Password
      </button>
      {message && <p className={message.includes("success") ? "text-green-400" : "text-red-400"}>{message}</p>}
    </div>
  );
};

const ChangeName = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeName = () => {
    // In a real application, you would send this data to your backend
    console.log("Changing name to:", name);
    setMessage("Name changed successfully!");
    setName("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="New Name"
        className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleChangeName}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg transition-all"
      >
        Change Name
      </button>
      {message && <p className={message.includes("success") ? "text-green-400" : "text-red-400"}>{message}</p>}
    </div>
  );
};

const ChangeEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeEmail = () => {
    // In a real application, you would send this data to your backend
    console.log("Changing email to:", email);
    setMessage("Email changed successfully!");
    setEmail("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="New Email"
        className="w-full p-3 rounded-lg bg-[#2c2e3f] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleChangeEmail}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg transition-all"
      >
        Change Email
      </button>
      {message && <p className={message.includes("success") ? "text-green-400" : "text-red-400"}>{message}</p>}
    </div>
  );
};

const SettingsPage = () => {
  const [activeOption, setActiveOption] = useState<string>("password");

  const settingsOptions: SettingsOption[] = [
    { label: "Change Password", icon: <FaLock />, content: <ChangePassword /> },
    { label: "Change Name", icon: <FaUser />, content: <ChangeName /> },
    { label: "Change Email", icon: <FaEnvelope />, content: <ChangeEmail /> },
  ];

  return (
    <div className="flex h-screen bg-[#0f111a] text-[#e5e7eb]">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 overflow-auto items-start ml-15">
        <h1 className="text-6xl font-dangrek ml-10 mt-10 mb-8">SETTINGS</h1>

        <div className="bg-[#1a1c29] border border-[#2c2e3f] p-8 rounded-2xl shadow-lg max-w-2xl w-full">
          <div className="flex border-b border-[#2c2e3f] mb-6">
            {settingsOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => setActiveOption(option.label.toLowerCase().replace(/ /g, ''))}
                className={`flex items-center space-x-2 px-6 py-3 text-lg transition-colors ${
                  activeOption === option.label.toLowerCase().replace(/ /g, '')
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-purple-300"
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          {settingsOptions.map((option) => (
            <div
              key={option.label}
              className={`${
                activeOption === option.label.toLowerCase().replace(/ /g, '') ? "block" : "hidden"
              } mt-6`}
            >
              {option.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;