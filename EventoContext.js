import React, { createContext, useState, useContext } from 'react';

const EventoContext = createContext();

export function EventoProvider({ children }) {
  const [eventos, setEventos] = useState([]);
  const [notaDestaque, setNotaDestaque] = useState(null); // Novo estado

  // Função para adicionar/remover nota destacada
  const toggleNotaDestaque = (nota) => {
    if (notaDestaque && notaDestaque.id === nota.id) {
      setNotaDestaque(null); // Remove o destaque se já estiver selecionado
    } else {
      setNotaDestaque(nota); // Adiciona a nova nota destacada
    }
  };

  return (
    <EventoContext.Provider
      value={{
        eventos,
        setEventos,
        notaDestaque,
        setNotaDestaque, // Opcional: expõe diretamente se precisar
        toggleNotaDestaque, // Função útil para componentes
      }}
    >
      {children}
    </EventoContext.Provider>
  );
}

export function useEventos() {
  return useContext(EventoContext);
}
