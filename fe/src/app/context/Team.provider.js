import React, { createContext, useContext, useState } from 'react';

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [selectedTeamOver, setSelectedTeam] = useState({});

  const updateSelectedTeam = (team) => {
    setSelectedTeam(team);
  };

  return (
    <TeamContext.Provider value={{ selectedTeamOver, updateSelectedTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
