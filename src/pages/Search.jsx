import { Center, Flex } from "@chakra-ui/react";
import PetCard from "../components/PetCard";
import SearchBar from "../components/SearchBar";
import React, { useState, useRef, useEffect } from "react";
import petService from "../services/pets";
import { useContext } from "react";
import { PetContext } from "../context/PetContext";
import Pagination from "../components/Pagination";

const Search = React.memo(() => {
  const [localPets, setLocalPets] = useState([]);
  const { pets } = useContext(PetContext);
  const [filteredPets, setFilteredPets] = useState(null);
  const input = useRef({
    type: "any",
    status: "any",
    size: "any",
    breed: "",
    color: "",
    name: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    pets?.length && setLocalPets(pets);
  }, [pets]);

  console.log("rendering Search");

  const handleInputText = (e) => {
    input.current[e.target.name] = e.target.value;
  };

  const sendQuery = async () => {
    setLoading(true);
    try {
      const queryString = Object.entries(input.current)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
      console.log(queryString);
      const res = await petService.search(queryString);
      setFilteredPets(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    sendQuery();
  };

  const totalPages = Math.ceil(
    (filteredPets?.length ?? localPets.length) / cardsPerPage
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = (filteredPets || localPets).slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const cards = currentCards.map((pet) => {
    return <PetCard key={pet._id} pet={pet} />;
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <Center p={7}>
      <Flex flexDir="column" align="center" justify="center">
        <SearchBar
          handleInputText={handleInputText}
          handleSearchSubmit={handleSearchSubmit}
          loading={loading}
        />
        <Flex mt={10} wrap="wrap" align="center" justify="center" gap={10}>
          {currentCards && cards.length > 0 ? cards : "No pets found."}
        </Flex>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Flex>
    </Center>
  );
});

Search.displayName = "Search";

export default Search;
