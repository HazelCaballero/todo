import React, { useState } from "react";
import Swal from "sweetalert2";
import CallsTasksByHazel from "../services/CallsTasksByHazel";
import "../styles/TaskMakerByHazel.css";

function TaskMakerByHazel({ tasks, setTasks }) {
  const [newTask, setNewTask] = useState(""); // Estado para la nueva tarea
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para evitar múltiples envíos

  // Maneja el cambio en el campo de entrada
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Maneja la adición de la tarea
  async function addTask(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del evento

    const usuarioActual = localStorage.getItem("idUsuario");

    if (!usuarioActual) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró un usuario autenticado. Por favor, inicia sesión."
      });
      return;
    }

    if (!newTask.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validación fallida",
        text: "Ingrese texto.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newTaskResponse = await CallsTasksByHazel.PostTasks(
        usuarioActual,
        newTask,
        "pendiente", // Estado inicial
        localStorage.getItem("idUsuario"),
        localStorage.getItem("nombreUsuario")
      );

      setTasks([...tasks, newTaskResponse]);
      Swal.fire({
        icon: "success",
        title: "Tarea agregada",
        text: `La tarea "${newTask}" ha sido agregada.`,
        confirmButtonText: "Entendido"
      });

      setNewTask(""); // Limpiar el campo de texto después de agregar la tarea
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar tarea",
        text: "Hubo un problema al intentar agregar la tarea. Intenta nuevamente."
      });
    } finally {
      setIsSubmitting(false); // Habilitar nuevamente el botón
    }
  }

  // Detectar tecla Enter y llamar a la función addTask
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask(event); // Llamar la misma función de agregar tarea
    }
  }

  return (
    <div className="TaskMakerContainer">
      {/* Etiqueta para el campo de entrada */}
      <label className="MakerTitle" htmlFor="task">Nueva tarea</label><br />
      <input
        className="MakerInputStyle"
        type="text"
        placeholder="Ejemplo: Tarea de Inglés"
        value={newTask}
        onChange={handleInputChange} // Llamo a la función handleInputChange cuando el usuario escribe
        onKeyDown={handleKeyDown} // Detecta la tecla Enter
      />
      <button className="BtnMaker" onClick={addTask} disabled={isSubmitting}>
        {isSubmitting ? "Agregando..." : "Agregar"} {/* Cambio el texto según el estado */}
      </button>
    </div>
  );
}

export default TaskMakerByHazel;
