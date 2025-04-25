import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown} // Detecta la tecla Enter
        placeholder="Search contacts..."
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1c183a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={onSearch}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-white"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
