import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CallsUsersByHAzel from "../services/CallsUsersByHazel";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext"; // Aquí estoy importando el contexto para manejar el usuario actual.

function LoginToDoApp() {
  // Configuré los estados locales para manejar los datos del usuario y la lista de usuarios.
  const [userNombre, SetuserNombre] = useState(""); // Guarda el nombre de usuario ingresado por el usuario.
  const [passwordUser, SetPasswordUser] = useState(""); // Guarda la contraseña ingresada.
  const [usuarios, SetUsuarios] = useState([]); // Contiene la lista de usuarios obtenidos de la API.
  const navigate = useNavigate(); // Me permite navegar entre páginas programáticamente.
  const { setCurrentUser } = useContext(UserContext); // Utilizo el contexto para establecer el usuario que se conectará.

  // Aquí implementé el useEffect para obtener la lista de usuarios al montar el componente.
  useEffect(() => {
    async function fetchDataUsers() {
      try {
        // Llamo a la API para traer la lista de usuarios.
        const datos = await CallsUsersByHAzel.GetUsers();
        console.log("Datos obtenidos:", datos); // Esto me sirve para depurar y verificar los datos obtenidos.
        if (Array.isArray(datos)) {
          SetUsuarios(datos); // Si los datos son un arreglo, los guardo en el estado.
        } else {
          console.error("Error: los datos no son un arreglo:", datos);
        }
      } catch (error) {
        // Si ocurre un error al obtener los usuarios, muestro un mensaje al usuario con SweetAlert.
        console.error("Error obteniendo usuarios:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cargar los usuarios. Por favor, inténtalo más tarde."
        });
      }
    }
    fetchDataUsers(); // Llamo a la función al montar el componente.
  }, []); // El arreglo vacío asegura que esto solo se ejecute una vez.

  // Aquí añadí la lógica de autenticación.
  function authenticate() {
    // Primero verifico que los campos no estén vacíos.
    if (!userNombre || !passwordUser) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, completa todos los campos antes de continuar."
      });
      return; // Detengo la ejecución si falta información.
    }

    // Uso el método find para buscar al usuario en la lista obtenida, asegurándome de ignorar espacios y mayúsculas.
    const found = usuarios.find(
      (usuario) =>
        usuario.nombreDeUsuario?.trim().toLowerCase() === userNombre.trim().toLowerCase() &&
        usuario.password === passwordUser
    );

    if (!found) {
      // Si no se encuentra un usuario que coincida, muestro un mensaje de error.
      Swal.fire({
        icon: "error",
        title: "Autenticación fallida",
        text: "Usuario o contraseña incorrectos. Inténtalo nuevamente."
      });
    } else {
      // Si el usuario se encuentra, guardo su nombre en el contexto para usarlo en otras partes de la app.
      setCurrentUser(found.nombreDeUsuario);
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola, ${userNombre}. Redirigiéndote a la aplicación...`,
        timer: 2000, // Muestra el mensaje durante 2 segundos.
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        // Después de mostrar el mensaje, redirijo al usuario a la página principal de la app.
        navigate("/AppToDo");
      });
    }
  }

  // Aquí está el diseño básico del formulario de login.
  return (
    <div className="LoginToDoContainer">
      <label>Usuario</label>
      {/* Este input está enlazado al estado userNombre. Actualizo el estado con el evento onChange. */}
      <input
        value={userNombre}
        onChange={(e) => SetuserNombre(e.target.value)}
        type="text"
        placeholder="Ingresa tu usuario"
      />
      <label>Contraseña</label>
      {/* Este input está enlazado al estado passwordUser. También se actualiza con onChange. */}
      <input
        value={passwordUser}
        onChange={(e) => SetPasswordUser(e.target.value)}
        type="password"
        placeholder="Ingresa tu contraseña"
      />
      {/* Este botón activa la función authenticate al hacer clic. */}
      <button onClick={authenticate}>Iniciar</button>
    </div>
  );
}

// Exporto el componente para que pueda ser utilizado en otras partes de la aplicación.
export default LoginToDoApp;
