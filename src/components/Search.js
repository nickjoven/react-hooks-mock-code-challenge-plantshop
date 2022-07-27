import React from "react";

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={(e) =>  {
          console.log("Searching...")
          setSearchTerm(e.target.value)
        }}
      />
    </div>
  );
}

export default Search;
