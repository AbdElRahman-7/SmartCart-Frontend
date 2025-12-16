// src/components/SearchBar.jsx
import { useState } from "react";

const SearchBar = ({ initialValue, onSearch, onClear }) => {
  const [searchText, setSearchText] = useState(initialValue || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchText);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full sm:w-auto"
    >
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full sm:w-64 px-3 py-2 rounded-lg border bg-zinc-900"
        placeholder="Search..."
      />
      <button type="submit" className="px-3 py-2 rounded-lg bg-indigo-600">
        Search
      </button>
      <button
        type="button"
        className="px-3 py-2 rounded-lg border"
        onClick={() => {
          setSearchText("");
          onClear();
        }}
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;
