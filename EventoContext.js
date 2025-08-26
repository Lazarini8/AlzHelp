import React, { createContext, useState, useContext } from 'react';

export const EventoContext = createContext();

export const EventoProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);
  const [notaDestaque, setNotaDestaque] = useState(null); // Adiciona o estado para notaDestaque

  return (
    <EventoContext.Provider value={{ eventos, setEventos, notaDestaque, setNotaDestaque }}>
      {children}
    </EventoContext.Provider>
  );
};

export const useEventos = () => {
  const context = useContext(EventoContext);
  if (!context) {
    throw new Error('useEventos deve ser usado dentro de um EventoProvider');
  }
  return context;
};