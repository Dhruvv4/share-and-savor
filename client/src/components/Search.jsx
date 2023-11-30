import React from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import restaurants from "./../../../data/NJData.json";
import { Navigate, useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  function filter_search(e) {
    e.preventDefault();

    const lowercaseSearch = search?.toLowerCase()?.trim();

    const result = restaurants.filter((req) => {
      return (
        req?.name?.toLowerCase() === lowercaseSearch ||
        req?.cuisine?.toLowerCase().includes(lowercaseSearch)
      );
    });

    setData(result);
    console.log(result);
    navigate("/search", { state: result });
  }

  return (
    <form onSubmit={filter_search} className="max-w-2xl mx-auto">
      <label className="text-center font-semibold my-10">
        Search for a restaurant
      </label>
      <input
        value={search}
        name="search_input"
        id="search_input"
        className="w-full rounded border border-solid border-gray h-10 my-5"
        placeholder="Enter the restaurant name/cuisines you want to search"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <Button>Search</Button>
    </form>
  );
};

export default Search;
