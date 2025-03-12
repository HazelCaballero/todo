import React from "react";
import "../styles/TasksCounterByHazel.css"

function TasksCounterByHazel({ tasks }) {
  // Obtener el id del usuario actual desde el localStorage
  const currentUserId = localStorage.getItem("idUsuario");

  // Filtrar las tareas para que solo incluyan las del usuario actual
  const userTasks = tasks.filter((task) => task.usuarioDeTarea === currentUserId);

  // Calculo el total de tareas del usuario actual
  const totalTasks = userTasks.length;

  // Tareas pendientes del usuario actual
  const pendingTasks = userTasks.filter((task) => task.estado === "pendiente").length;

  // Tareas completadas del usuario actual
  const completedTasks = userTasks.filter((task) => task.estado === "completa").length;

  // Devuelvo un contenedor con la información calculada:
  return (
    <div className="TasksCounterContainer">
      <p>Total de tareas: <span className="CounterNumber">{totalTasks}</span> </p> {/* Muestra cuántas tareas hay en total para el usuario actual */}
      <p>Tareas pendientes: <span className="CounterNumber">{pendingTasks}</span></p> {/* Muestra cuántas están pendientes para el usuario actual */}
      <p>Tareas completadas: <span className="CounterNumber"> {completedTasks}</span></p> {/* Muestra cuántas se han completado para el usuario actual */}
    </div>
  );
}

export default TasksCounterByHazel;
