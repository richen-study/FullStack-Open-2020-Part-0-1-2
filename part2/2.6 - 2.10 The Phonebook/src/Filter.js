import React from "react";
import App from "./App";

export default function Filter({ search }) {
  const handleSearchChange = (event) => {
    if (search === "") {
      setShowAll(true);
      setSearch(event.target.value);
    }
    setShowAll(false);
    setSearch(event.target.value);
  };
  return (
    <>
      <form>
        <div>
          Search People:
          <input value={search} onChange={handleSearchChange} />
        </div>
      </form>
    </>
  );
}
