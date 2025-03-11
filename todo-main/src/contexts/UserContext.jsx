import React, { createContext, useState, useEffect } from "react";

// Crea el contexto para el usuario
const UserContext = createContext();

// Componente que envuelve tu aplicación y provee el contexto
function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Intenta obtener el usuario desde localStorage (si existe)
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser)); // Asumiendo que lo guarde como objeto JSON
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
