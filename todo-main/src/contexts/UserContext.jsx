import React, { createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Aquí estoy creando un contexto llamado UserContext. Este será el espacio global donde manejaré 
// la información del usuario (quién está conectado y cómo actualizar esa información).
export const UserContext = createContext();

// Este es el proveedor del contexto. Básicamente envuelve toda la aplicación y le da acceso
// al estado del usuario a cualquier componente que lo necesite.
export const UserProvider = ({ children }) => {
  // Aquí estoy definiendo el estado "currentUser", que almacena al usuario actual.
  const [currentUser, setCurrentUser] = useState(null); 

  return (
    // Todo lo que esté dentro de este UserContext.Provider puede acceder 
    // al estado del usuario gracias al value que paso.
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Este componente representa la página de usuario. Aquí estoy mostrando información basada
// en si hay un usuario conectado o no, y añado botones para login y logout.
function UserPage() {
  // Utilizo el contexto para acceder al usuario actual y la función que lo actualiza.
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Página de Usuario</h1>
      {/* Verifico si hay un usuario conectado */}
      {currentUser ? (
        // Si hay un usuario, muestro un saludo personalizado.
        <p>Bienvenido, {currentUser.name}!</p>
      ) : (
        // Si no hay nadie conectado, aviso al usuario.
        <p>No hay un usuario conectado.</p>
      )}
      {/* Botón para simular un login (con un usuario ficticio llamado "Hazel") */}
      <button onClick={() => setCurrentUser({ name: "Hazel" })}>Login</button>
      {/* Botón para simular un logout (elimina al usuario actual) */}
      <button onClick={() => setCurrentUser(null)}>Logout</button>
    </div>
  );
}

// Esta es una página simple que simula una aplicación ToDo.
function AppToDoByHazel() {
  return <div>App ToDo - Hazel</div>; // Más adelante puedo añadir funcionalidades reales aquí.
}

// Aquí estoy creando otra página simple para representar el Login/Register.
function LogRegByHazel() {
  return <div>Login/Register - Hazel</div>; // Aquí podría implementar un formulario de autenticación.
}

// Este componente es la barra de navegación. Está pensada para facilitar el movimiento
// entre las diferentes páginas de la aplicación.
function Navigation() {
  return (
    <nav>
      {/* Uso Link de react-router-dom para generar enlaces entre las páginas. */}
      <Link to="/AppToDo">ToDo</Link> |{" "}
      <Link to="/LogRegByHazel">Login/Register</Link> |{" "}
      <Link to="/user">User Page</Link>
    </nav>
  );
}

// Aquí definí todas las rutas principales de la aplicación. Es la estructura que conecta
// cada URL con su respectivo componente.
function RoutingByHazel() {
  return (
    <div>
      {/* UserProvider envuelve toda la aplicación para garantizar acceso global al contexto del usuario */}
      <UserProvider>
        <Router>
          {/* Incluyo la barra de navegación para que esté disponible en todas las páginas */}
          <Navigation />
          <Routes>
            {/* Ruta para la página de ToDo */}
            <Route path="/AppToDo" element={<AppToDoByHazel />} />
            {/* Ruta para la página de Login/Register */}
            <Route path="/LogRegByHazel" element={<LogRegByHazel />} />
            {/* Ruta para la página del usuario */}
            <Route path="/user" element={<UserPage />} />
            {/* Ruta comodín para manejar errores si el usuario intenta ir a una página inexistente */}
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

// Finalmente, exporto este componente principal para que sea el punto de entrada de mi aplicación.
export default RoutingByHazel;
