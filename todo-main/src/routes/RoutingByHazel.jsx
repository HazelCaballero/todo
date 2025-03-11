import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importo el enrutador de React Router.

import AppToDoByHazel from "../pages/AppToDoByHazel"; // Página principal de la aplicación ToDo.
import LogRegByHazel from "../pages/LogRegByHazel"; // Página para login y registro.


function RoutingByHazel() {
  return (
    <div>
      {/* Envuelvo la aplicación con el UserProvider para que cualquier componente pueda consumir el contexto. */}

        <Router>
          <Routes>
            {/* Ruta para la página principal de tareas */}
            <Route path="/AppToDo" element={<AppToDoByHazel />} />
            {/* Ruta para login y registro */}
            <Route path="/LogRegByHazel" element={<LogRegByHazel />} />
          </Routes>
        </Router>
     
    </div>
  );
}

export default RoutingByHazel; // Exporto el componente principal para usarlo en otras partes de la app.
