import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import petService from "../services/pets";
import useToastService from "../hooks/useToastService";

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { displayToast } = useToastService();

  useEffect(() => {
    localStorage.removeItem("currentPage");
    localStorage.removeItem("filteredPets");
    getPets();
  }, []);

  const getPets = async () => {
    setLoading(true);
    try {
      const res = await petService.getAll();
      setPets(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePetSave = async (petId) => {
    if (!user) {
      displayToast("error", "You must be logged in to save pets.");
      return;
    }

    setLoading(true);

    try {
      const petIndex = pets.findIndex((pet) => pet.id === petId);
      if (petIndex === -1) return;

      const updatedPets = [...pets];
      const pet = updatedPets[petIndex];

      const savedBy = pet.savedBy || [];
      const userIndex = savedBy.indexOf(user.id);

      if (userIndex === -1) {
        savedBy.push(user.id);
        await petService.changeStatus(petId, { action: "save" });
        displayToast("success", "Pet saved!");
      } else {
        savedBy.splice(userIndex, 1);
        await petService.changeStatus(petId, { action: "unsave" });
        displayToast("info", "Pet removed from saved pets.");
      }

      updatedPets[petIndex] = { ...pet, savedBy };
      setPets(updatedPets);
    } catch (error) {
      displayToast("error", error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changePetStatus = (petId, action, cb) => async () => {
    setLoading(true);
    try {
      const res = await petService.changeStatus(petId, { action });
      setPets((prevState) => {
        const newState = prevState.map((pet) => {
          return pet.id === petId
            ? {
                ...pet,
                ...res,
              }
            : pet;
        });
        return newState;
      });
      cb();
    } catch (error) {
      displayToast("error", error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addPet = async (pet, cb) => {
    setLoading(true);
    try {
      const res = await petService.create(pet);
      setPets((prevState) => [...prevState, res]);
      displayToast("success", "Pet added!");
      cb();
    } catch (error) {
      displayToast("error", error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editPet = async (petId, pet) => {
    setLoading(true);
    try {
      const res = await petService.update(petId, pet);
      setPets((prevState) => {
        const newState = prevState.map((pet) => {
          return pet.id === res.id
            ? {
                ...res,
              }
            : pet;
        });
        return newState;
      });
      displayToast("success", "Pet updated");
    } catch (error) {
      displayToast("error", error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        togglePetSave,
        changePetStatus,
        addPet,
        editPet,
        loading,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
