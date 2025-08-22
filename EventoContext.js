import React, { createContext, useState } from 'react';

export const EventoContext = createContext();

export const EventoProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);

  return (
    <EventoContext.Provider value={{ eventos, setEventos }}>
      {children}
    </EventoContext.Provider>
  );
};

export const useEventos = () => React.useContext(EventoContext);