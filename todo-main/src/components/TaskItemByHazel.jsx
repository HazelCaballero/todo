import React from "react";
import Swal from "sweetalert2";
import CallsTasksByHazel from "../services/CallsTasksByHazel";
import "../styles/TaskItemByHazel.css";

function TaskItemByHazel({ tasks, setTasks }) {
  // Esta función cambia el estado de la tarea (de "pendiente" a "completa" y viceversa).
  async function toggleTaskCompletion(task) {
    const newState = task.estado === "pendiente" ? "completa" : "pendiente"; // Cambia entre los dos estados posibles.
    try {
      // Aquí actualizo el estado de la tarea llamando a la API.
      const updatedTask = await CallsTasksByHazel.UpdateTasks(
        task.usuarioDeTarea, // Usuario al que pertenece la tarea.
        task.tarea,          // Nombre de la tarea.
        newState,            // Nuevo estado que quiero asignarle.
        task.id              // ID único de la tarea.
      );
      // Actualizo la lista de tareas local para reflejar el cambio en la interfaz.
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );

    } catch (error) {
      // Si algo falla, muestro un mensaje de error con SweetAlert.
      Swal.fire({
        icon: "error",
        title: "Error al actualizar tarea",
        text: "Hubo un problema al cambiar el estado de la tarea."
      });
    }
  }

  // Esta función elimina una tarea.
  async function deleteTask(taskId) {
    try {
      // Llamo a la API para eliminar la tarea.
      await CallsTasksByHazel.DeleteTask(taskId);
      // Filtro la lista de tareas local para quitar la tarea eliminada.
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      // Muestro un mensaje de confirmación al usuario.
      Swal.fire({
        icon: "success",
        title: "Tarea eliminada",
        text: "La tarea ha sido eliminada con éxito."
      });
    } catch (error) {
      // Si ocurre un error, notifico al usuario.
      Swal.fire({
        icon: "error",
        title: "Error al eliminar tarea",
        text: "Hubo un problema al eliminar la tarea."
      });
    }
  }

  // Esta función permite editar el nombre de una tarea.
  async function editTask(task) {
    // Usé SweetAlert para mostrar un cuadro de entrada y pedir al usuario un nuevo nombre.
    const { value: newTaskName } = await Swal.fire({
      title: "Editar tarea",
      input: "text", // Campo de texto para editar el nombre.
      inputLabel: "Nuevo nombre de la tarea",
      inputPlaceholder: "Escribe el nuevo nombre",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario no escribió nada o ingresó un valor vacío, muestro una advertencia.
    if (!newTaskName || !newTaskName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validación fallida",
        text: "El nombre de la tarea no puede estar vacío.",
      });
      return; // Salgo de la función si el nombre no es válido.
    }

    try {
      // Llamo a la API para actualizar el nombre de la tarea.
      const updatedTask = await CallsTasksByHazel.UpdateTasks(
        task.usuarioDeTarea, // Usuario al que pertenece la tarea.
        newTaskName,         // Nuevo nombre que se ingresó.
        task.estado,         // Estado actual de la tarea.
        task.id              // ID único de la tarea.
      );
      // Actualizo la lista de tareas local para reflejar el nuevo nombre.
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
      // Confirmo al usuario que la tarea fue actualizada.
      Swal.fire({
        icon: "success",
        title: "Tarea actualizada",
        text: `La tarea ha sido renombrada a "${newTaskName}".`
      });
    } catch (error) {
      // Si ocurre un error, notifico al usuario.
      Swal.fire({
        icon: "error",
        title: "Error al editar tarea",
        text: "Hubo un problema al editar la tarea."
      });
    }
  }

 
  const porUsario = tasks.filter(task => task.usuarioDeTarea === localStorage.getItem("idUsuario"))

  console.log(porUsario);
  
  return (
    <div className="TaskItemContainer">
      {/* Verifico si hay tareas en la lista */}
      {
      porUsario.length >= 0 ? (
        porUsario.map((task)=>{
          return(
        // Recorro la lista de tareas para mostrar cada una.
          <div className="TaskItem" key={task.id}>
           <p>{task.tarea}</p>
            {/* Checkbox para cambiar el estado de la tarea */}
            <input
              type="checkbox"
              checked={tasks.estado === "completa"} // Marcado si la tarea está completa.
              onChange={() => toggleTaskCompletion(task)} // Cambia el estado al hacer clic.
            />
            {/* Nombre de la tarea con estilo según su estado */}
            <span className={`TaskName ${task.estado}`}>{task.tarea}</span>
            {/* Botón para editar la tarea */}
            <button onClick={() => editTask(task)}>Editar</button>
            {/* Botón para eliminar la tarea */}
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </div>
          )
      })
        )
        : (
          // Si no hay tareas, muestro un mensaje.
          <p>No tienes tareas pendientes. ¡Crea una nueva tarea!</p>
        )
      }
    </div>
  );
}

export default TaskItemByHazel;
