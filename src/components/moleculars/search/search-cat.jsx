import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setBreed, setLoading } from "../../../redux/action/glocalAction";

const SearchCat = ({ searchTerm, setSearchTerm }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds/search?q=${searchTerm}`
      );
      dispatch(setBreed(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="gap-10 flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search Breeds"
          className="p-3 pl-10 text-sm text-gray-900 border border-gray-100 rounded-md bg-neutral-100 focus:ring-blue-500 focus:border-blue-500 "
        />
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SearchCat;
