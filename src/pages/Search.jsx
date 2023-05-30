import { Center, Flex, Spinner } from "@chakra-ui/react";
import PetCard from "../components/PetCard";
import SearchBar from "../components/SearchBar";
import React, { useState, useRef, useEffect } from "react";
import petService from "../services/pets";
import { useContext } from "react";
import { PetContext } from "../context/PetContext";
import Pagination from "../components/Pagination";

const Search = React.memo(() => {
  const [localPets, setLocalPets] = useState([]);
  const { pets, loading } = useContext(PetContext);
  const [filteredPets, setFilteredPets] = useState(
    JSON.parse(localStorage.getItem("filteredPets")) || null
  ); // Retrieve the filteredPets from local storage
  const input = useRef({
    type: "any",
    status: "any",
    size: "any",
    breed: "",
    color: "",
    name: "",
  });
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("currentPage")) || 1
  );
  const cardsPerPage = 10;
  const [queryLoading, setQueryLoading] = useState(false);

  useEffect(() => {
    pets?.length &&
      setLocalPets(
        pets.sort((a, b) =>
          a.status === "available" && b.status !== "available"
            ? -1
            : a.status !== "available" && b.status === "available"
            ? 1
            : 0
        )
      );
  }, [pets]);

  useEffect(() => {
    localStorage.setItem("filteredPets", JSON.stringify(filteredPets)); // Store the filteredPets in local storage
  }, [filteredPets]);

  const handleInputText = (e) => {
    input.current[e.target.name] = e.target.value;
  };

  const sendQuery = async () => {
    setQueryLoading(true);
    try {
      const queryString = Object.entries(input.current)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
      const res = await petService.search(queryString);
      setFilteredPets(res);
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1); // Reset to the first page when the query changes
      localStorage.setItem("filteredPets", JSON.stringify(res)); // Store the query result in local storage
    } catch (error) {
      console.log(error);
    } finally {
      setQueryLoading(false);
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
    return <PetCard key={pet.id} pet={pet} />;
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <Center p={7}>
      <Flex flexDir="column" align="center" justify="center">
        <SearchBar
          handleInputText={handleInputText}
          handleSearchSubmit={handleSearchSubmit}
          loading={queryLoading}
        />
        <Flex mt={10} wrap="wrap" align="center" justify="center" gap={10}>
          {loading && !pets ? (
            <Spinner />
          ) : currentCards && cards.length > 0 ? (
            cards
          ) : (
            "No pets found."
          )}
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
