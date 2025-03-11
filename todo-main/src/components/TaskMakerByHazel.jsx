import React, { useState } from "react";
import Swal from "sweetalert2";
import CallsTasksByHazel from "../services/CallsTasksByHazel";
import "../styles/TaskMakerByHazel.css";

function TaskMakerByHazel({ tasks, setTasks }) {
  // Este estado maneja la tarea nueva que el usuario va a ingresar.
  const [newTask, setNewTask] = useState("");
  // Uso este estado para deshabilitar el botón de agregar mientras se procesa la solicitud.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Esta función se encarga de capturar lo que el usuario escribe en el campo de texto.
  function handleInputChange(event) {
    setNewTask(event.target.value); // Cada vez que el usuario escribe, actualizo el estado "newTask".
  }

  // Esta función maneja el flujo para agregar una nueva tarea.
  async function addTask(event) {
    event.preventDefault(); // Prevengo que el formulario recargue la página al enviarse.

    // Obtengo el usuario actual desde el localStorage.
    const usuarioActual = localStorage.getItem("idUsuario");

    if (!usuarioActual) {
      // Si no encuentro un usuario autenticado, muestro una alerta y detengo el flujo.
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró un usuario autenticado. Por favor, inicia sesión."
      });
      return;
    }

    // Valido que el campo de la nueva tarea no esté vacío.
    if (!newTask.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validación fallida",
        text: "Ingrese texto.", // Mensaje para alertar al usuario.
      });
      return;
    }

    setIsSubmitting(true); // Cambio el estado para evitar múltiples envíos mientras se procesa.

    try {
      // Llamo al servicio para agregar la nueva tarea, enviando el usuario, el texto de la tarea y el estado inicial (pendiente).
      const newTaskResponse = await CallsTasksByHazel.PostTasks(
        usuarioActual, // Usuario actual que está creando la tarea.
        newTask,       // Nombre de la tarea que se está añadiendo.
        "pendiente",    // Las tareas nuevas siempre empiezan como pendientes.
        localStorage.getItem("idUsuario"),
        localStorage.getItem("nombreUsuario")
      );

      // Actualizo el estado global "tasks" con la nueva tarea agregada.
      setTasks([...tasks, newTaskResponse]);
      Swal.fire({
        icon: "success",
        title: "Tarea agregada",
        text: `La tarea "${newTask}" ha sido agregada.`,
        confirmButtonText: "Entendido"
      });

      setNewTask(""); // Limpio el campo de texto después de agregar la tarea.
    } catch (error) {
      // Si ocurre un error durante la llamada a la API, muestro un mensaje al usuario.
      Swal.fire({
        icon: "error",
        title: "Error al agregar tarea",
        text: "Hubo un problema al intentar agregar la tarea. Intenta nuevamente."
      });
    } finally {
      // Finalmente, habilito el botón nuevamente sin importar el resultado.
      setIsSubmitting(false);
    }
  }

  return (
    <div className="TaskMakerContainer">
      {/* Etiqueta para el campo de entrada */}
      <label htmlFor="task">Nueva tarea</label>
      {/* Campo de texto donde el usuario escribe su tarea */}
      <input
        type="text"
        placeholder="Ejemplo: Tarea de Inglés" // Ayuda para indicar cómo escribir una tarea.
        value={newTask} // Enlazo el valor al estado "newTask".
        onChange={handleInputChange} // Llamo a la función handleInputChange cuando el usuario escribe.
      />
      {/* Botón para agregar la tarea, deshabilitado si la tarea está en proceso */}
      <button onClick={addTask} disabled={isSubmitting}>
        {isSubmitting ? "Agregando..." : "Agregar"} {/* Cambio el texto según el estado */}
      </button>
    </div>
  );
}

export default TaskMakerByHazel;
