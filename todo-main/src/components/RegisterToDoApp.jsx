import React, { useState } from "react";
import Swal from "sweetalert2";
import CallsUsersByHAzel from "../services/CallsUsersByHazel"; // Importo el servicio que me permitirá guardar los datos del usuario.
import "../styles/RegisterToDoApp.css"

// Esta función valida las entradas del formulario. Me aseguré de definir tres expresiones regulares
// para validar cada campo según criterios específicos.
function validateInputs(userNombre, email, passwordUser) {
  const nameRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // El nombre debe incluir mayúsculas, minúsculas y al menos 8 caracteres.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // La dirección de correo debe cumplir con un formato válido estándar.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // La contraseña requiere una mayúscula, una minúscula y un número.

  // Primero reviso que todos los campos estén llenos.
  if (!userNombre || !email || !passwordUser) {
    return { valid: false, message: "Todos los campos son obligatorios." };
  }
  // Luego verifico que el nombre cumpla con los requisitos de longitud y formato.
  if (!nameRegex.test(userNombre)) {
    return {
      valid: false,
      message: "El nombre debe tener al menos 8 caracteres, incluir letras mayúsculas y minúsculas."
    };
  }
  // Compruebo que el email tenga un formato válido.
  if (!emailRegex.test(email)) {
    return { valid: false, message: "El correo electrónico no tiene un formato válido." };
  }
  // Finalmente, reviso la contraseña para asegurar que sea segura.
  if (!passwordRegex.test(passwordUser)) {
    return {
      valid: false,
      message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
    };
  }
  // Si todo está bien, la función devuelve que las entradas son válidas.
  return { valid: true };
}

// Aquí está mi componente principal para el registro.
function RegisterToDoApp() {
  // Estoy utilizando estados locales para manejar los datos introducidos por el usuario.
  const [userNombre, setUserNombre] = useState("");
  const [email, setEmail] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Este estado evita que el formulario se envíe varias veces al mismo tiempo.

  // Esta función maneja el flujo de registro cuando el usuario envía el formulario.
  async function handleRegister(event) {
    event.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario (recargar la página).

    // Valido los campos con la función creada anteriormente.
    const validation = validateInputs(userNombre, email, passwordUser);
    if (!validation.valid) {
      // Si la validación falla, utilizo SweetAlert para mostrar un mensaje claro al usuario.
      Swal.fire({
        icon: "warning",
        title: "Validación fallida",
        text: validation.message,
        customClass: {
          popup: "mi-popup", 
          title: "mi-titulo",
        }
      });
      return; // Detengo la ejecución si hay errores en la validación.
    }

    setIsSubmitting(true); // Deshabilito el botón mientras el registro está en proceso.

    try {
      // Envío los datos al backend a través del servicio `PostUsers`.
      await CallsUsersByHAzel.PostUsers(userNombre, email, passwordUser);
      // Si todo sale bien, muestro un mensaje de éxito.
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El usuario ha sido registrado correctamente.",
        confirmButtonText: "Entendido",
      });

      // Limpio los campos del formulario después de un registro exitoso.
      setUserNombre("");
      setEmail("");
      setPasswordUser("");
    } catch (error) {
      // En caso de error, muestro un mensaje de alerta.
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: "Hubo un problema al intentar registrar el usuario. Inténtalo nuevamente.",
        customClass: {
          popup: "mi-popup", // Clase para el contenedor principal
          title: "mi-titulo", // Clase para el título
        }
      });      
    } finally {
      setIsSubmitting(false); // Siempre habilito el botón al final del proceso.
    }
  }



  return (
    <div className="RegisterToDoContainer">
      <h2 className="loginRegTitle">Registro</h2>
      {/* Aquí está el formulario de registro que maneja la función handleRegister */}
      <form onSubmit={handleRegister}>
        <label className="labelRegStyle">Usuario</label> <br />
        <input
        className="inputRegStyle"
          value={userNombre} // El valor está enlazado al estado userNombre.
          onChange={(e) => setUserNombre(e.target.value)} // Actualizo el estado al escribir en el campo.
          type="text"
          placeholder="Escribe tu nombre"
        />
        <br />
        <label className="labelRegStyle">Email</label> <br />
        <input
        className="inputRegStyle"
          value={email} // Enlazo este campo con el estado email.
          onChange={(e) => setEmail(e.target.value)} // Actualizo email al escribir.
          type="email"
          placeholder="Escribe tu correo"
        />
        <br />
        <label className="labelRegStyle">Contraseña</label> <br />
        <input
          className="inputRegStyle"
          value={passwordUser} // Este campo está enlazado al estado passwordUser.
          onChange={(e) => setPasswordUser(e.target.value)} // Actualizo la contraseña conforme se escribe.
          type="password"
          placeholder="Crea una contraseña segura"
        />
        <br />
        {/* El botón se desactiva si isSubmitting es true, para evitar envíos múltiples */}
        <button className="btnAddRegStyle" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrar"} {/* Cambio el texto según el estado */}
        </button>
      </form>
    </div>
  );
}

export default RegisterToDoApp;
