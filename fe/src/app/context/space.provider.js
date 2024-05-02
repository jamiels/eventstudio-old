import React, { createContext, useContext, useState } from 'react';

const SpaceContext = createContext(); // Changed TeamContext to SpaceContext

export const useSpace = () => useContext(SpaceContext); // Changed useTeam to useSpace

export const SpaceProvider = ({ children }) => { // Changed TeamProvider to SpaceProvider
  const [selectedSpace, setSelectedSpace] = useState({}); // Changed selectedTeamOver to selectedSpace
  const [spaces, setSpaces] = useState([]); // State to store the fetched spaces

  const updateSelectedSpace = (space) => { // Changed updateSelectedTeam to updateSelectedSpace
    setSelectedSpace(space);
  };

  return (
    <SpaceContext.Provider value={{ selectedSpace, updateSelectedSpace, setSpaces, spaces }}> {/* Changed selectedTeamOver to selectedSpace */}
      {children}
    </SpaceContext.Provider>
  );
};
