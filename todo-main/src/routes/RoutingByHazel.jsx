import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importo el enrutador de React Router.
import { UserProvider, UserContext } from "../contexts/userContext.jsx"; // Importo el contexto de usuario.

import AppToDoByHazel from "../pages/AppToDoByHazel"; // Página principal de la aplicación ToDo.
import LogRegByHazel from "../pages/LogRegByHazel"; // Página para login y registro.

function UserPage() {
  // Uso el contexto para acceder al usuario actual.
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>User Page</h1>
      {/* Si hay un usuario conectado, muestro su nombre. Si no, informo que no hay un usuario activo. */}
      {currentUser ? (
        <p>Bienvenido, {currentUser.name}!</p> // Mensaje personalizado para el usuario conectado.
      ) : (
        <p>No hay un usuario conectado.</p> // Mensaje para cuando no hay nadie conectado.
      )}
    </div>
  );
}

function RoutingByHazel() {
  return (
    <div>
      {/* Envuelvo la aplicación con el UserProvider para que cualquier componente pueda consumir el contexto. */}
      <UserProvider>
        <Router>
          <Routes>
            {/* Ruta para la página principal de tareas */}
            <Route path="/AppToDo" element={<AppToDoByHazel />} />
            {/* Ruta para login y registro */}
            <Route path="/LogRegByHazel" element={<LogRegByHazel />} />
            {/* Ruta para la página del usuario */}
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default RoutingByHazel; // Exporto el componente principal para usarlo en otras partes de la app.
