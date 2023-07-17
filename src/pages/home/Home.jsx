import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreed, setLoading } from "../../redux/action/glocalAction";
import PaddingContainer from "../../components/moleculars/padding-container/padding-container";
import { Transition } from "@headlessui/react";
import SearchCat from "../../components/moleculars/search/search-cat";

function Home() {
  const dispatch = useDispatch();
  const { isLoading, breeds } = useSelector((store) => store?.global);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const toggleExpand = (index) => {
    if (index === activeIndex) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
    }
    setActiveIndex(index);
  };

  const fetchData = async () => {
    dispatch(setLoading(true));
    const response = await axios.get(
      `https://api.thecatapi.com/v1/breeds?page=${page}&limit=10`
    );
    dispatch(setBreed([...breeds, ...response.data]));
    setPage((prevPage) => prevPage + 1);
    setRefresh(false);
    dispatch(setLoading(false));
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    console.log(scrollHeight - scrollTop);
    console.log(clientHeight);
    if (scrollHeight - scrollTop <= clientHeight) {
      fetchData();
    }
  };

  return (
    <PaddingContainer>
      <div className="pt-10" />
      <div className="flex items-center gap-20 mb-3 border-b-2 py-2">
        <SearchCat
          searchTerm={searchTerm}
          breeds={breeds}
          setSearchTerm={setSearchTerm}
          setPage={setPage}
          page={page}
        />
      </div>
      <div className="max-h-[600px] overflow-auto py-3" onScroll={handleScroll}>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-3 lg:auto-cols-fr ">
          {breeds.length > 0
            ? breeds.map((breed, key) => (
                <div
                  key={key}
                  className="max-w-sm rounded overflow-hidden shadow-lg min-h-500px"
                >
                  <img
                    className="w-full"
                    src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{breed.name} </div>
                    <p className="text-gray-700 text-base text-justify line-clamp-2">
                      {breed.description}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <div key={key} className="mb-4">
                      <button
                        onClick={() => toggleExpand(key)}
                        className="flex justify-between w-full py-2 px-4 bg-gray-300 hover:bg-gray-400"
                      >
                        <span>Details</span>
                        <span>{isOpen && activeIndex === key ? "-" : "+"}</span>
                      </button>
                      <Transition
                        show={isOpen && activeIndex === key}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <div className="p-4 bg-gray-200 text-justify">
                          {breed.description}
                        </div>
                      </Transition>
                    </div>
                    {breed?.temperament?.split(", ")?.map((tem, keySp) => {
                      return (
                        <span
                          key={keySp}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          {tem}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))
            : "Oops, data Not Found"}
        </div>
      </div>
      <div className="pt-10" />
    </PaddingContainer>
  );
}

export default Home;
