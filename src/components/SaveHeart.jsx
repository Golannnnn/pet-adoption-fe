import { useEffect, useContext, useState } from "react";
import { Tooltip, Spinner } from "@chakra-ui/react";
import { PetContext } from "../context/PetContext";
import { AuthContext } from "../context/AuthContext";

const SaveHeart = ({ petId }) => {
  const { pets, togglePetSave } = useContext(PetContext);
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSaved(isPetSaved());
  }, [pets, petId]);

  const isPetSaved = () => {
    if (!user) return false;
    const pet = pets.find((pet) => pet.id === petId);
    return pet && pet.savedBy && pet.savedBy.includes(user.id);
  };

  const handleClick = async () => {
    setLoading(true);
    await togglePetSave(petId);
    setLoading(false);
  };

  return (
    <Tooltip
      label={isSaved ? "Remove from saved pets" : "Save pet"}
      placement="top-start"
      m={5}
      hasArrow
    >
      {loading ? (
        <Spinner position="absolute" top={18} right={18} />
      ) : (
        <svg
          onClick={handleClick}
          className={isSaved ? "svg saved" : "svg unsaved"}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 64 64"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Layer_1">
              <g>
                <circle className="st0" cx="32" cy="32" r="32"></circle>
              </g>
              <g className="st1">
                <g>
                  <path
                    className="st2"
                    d="M50,31c-0.1-5.5-4.6-10.4-10.1-10.4c-3.2,0-6,1.7-7.9,4.1c-1.9-2.5-4.7-4.1-7.9-4.1c-5.5,0-10,4.9-10.1,10.4 h0c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0.2,0,0.3,0,0.4c0.5,14.1,17.8,19.8,17.8,19.8S49.4,45.7,50,31.6c0-0.2,0-0.3,0-0.4 C50,31.2,50,31.1,50,31C50,31.1,50,31,50,31L50,31z"
                  ></path>
                </g>
              </g>
              <g>
                <g>
                  <path
                    className="st3"
                    d="M50,29c-0.1-5.5-4.6-10.4-10.1-10.4c-3.2,0-6,1.7-7.9,4.1c-1.9-2.5-4.7-4.1-7.9-4.1c-5.5,0-10,4.9-10.1,10.4 h0c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0.2,0,0.3,0,0.4c0.5,14.1,17.8,19.8,17.8,19.8S49.4,43.7,50,29.6c0-0.2,0-0.3,0-0.4 C50,29.2,50,29.1,50,29C50,29.1,50,29,50,29L50,29z"
                  ></path>
                </g>
              </g>
            </g>
            <g id="Layer_2"> </g>
          </g>
        </svg>
      )}
    </Tooltip>
  );
};

export default SaveHeart;
