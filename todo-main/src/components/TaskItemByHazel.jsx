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
    // Use un SweetAlert para mostrar un cuadro de entrada y pedir al usuario una nueva tarea.
    const { value: newTaskName } = await Swal.fire({
      title: "Editar tarea",
      input: "text", // Campo de texto para editar el nombre.
      inputLabel: "Nuevo nombre de la tarea",
      inputPlaceholder: "Escribe el nuevo nombre",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      
      // Estilos personalizados:
      customClass: {
        popup: 'custom-popup',  // Clase para la ventana emergente
        title: 'custom-title',  // Clase para el título
        input: 'custom-input',  // Clase para el input de texto
        inputLabel: 'custom-label',
        confirmButton: 'custom-confirm-button',  // Clase para el botón de confirmar
        cancelButton: 'custom-cancel-button',  // Clase para el botón de cancelar

      },

    });
  
    // Si el nombre de la tarea está vacío, mostramos una advertencia:
    if (!newTaskName || !newTaskName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Validación fallida",
        text: "El nombre de la tarea no puede estar vacío.",
      });
      return;
    }
  
    try {
      // Llamo a la API para actualizar el nombre de la tarea.
      const updatedTask = await CallsTasksByHazel.UpdateTasks(
        task.usuarioDeTarea,
        newTaskName,
        task.estado,
        task.id
      );
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
      Swal.fire({
        icon: "success",
        title: "Tarea actualizada",
        text: `La tarea ha sido renombrada a "${newTaskName}".`
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al editar tarea",
        text: "Hubo un problema al editar la tarea."
      });
    }
  }
  

  const porUsario = tasks.filter(task => task.usuarioDeTarea === localStorage.getItem("idUsuario"));

  console.log(porUsario);

  return (
    <div className="TaskItemContainer">
      {/* Verifico si hay tareas en la lista */}
      {
        porUsario.length > 0 ? (
          porUsario.map((task) => {
            return (
              <div className="TaskItem" key={task.id}>
                <p className="TaskTitle">{task.tarea}</p>
                {/* Checkbox para cambiar el estado de la tarea */}
                <input className="ItemCheckBox"
                  type="checkbox"
                  checked={task.estado === "completa"} // Marcado si la tarea está completa.
                  onChange={() => toggleTaskCompletion(task)} // Cambia el estado al hacer clic.
                >
                </input>
                {/* Nombre de la tarea con estilo según su estado */}
                <span className={`TaskName ${task.estado}`}>{task.estado}</span> <br />
                {/* Botón para editar la tarea */}
                <button onClick={() => editTask(task)}> <img className="MakerIcons" src="../src/img/editar.png" alt="icono editar" /> </button>
                {/* Botón para eliminar la tarea */}
                <button onClick={() => deleteTask(task.id)}> <img className="MakerIcons" src="../src/img/eliminar.png" alt="icono eliminar" /> </button>
              </div>
            )
          })
        ) : (
          // Si no hay tareas, muestro un mensaje.
          <p className="NoTaskStyle">No tienes tareas pendientes. ¡Crea una nueva tarea!</p>
        )
      }
    </div>
  );
}

export default TaskItemByHazel;
