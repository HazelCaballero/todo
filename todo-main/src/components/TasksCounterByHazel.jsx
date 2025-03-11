import React from "react";

function TasksCounterByHazel({ tasks }) {
  // Calculo el total de tareas. Simplemente cuento cuántas tareas hay en la lista "tasks".
  const totalTasks = tasks.length;

  // Aquí filtro las tareas que tienen el estado "pendiente" y cuento cuántas son.
  const pendingTasks = tasks.filter((task) => task.estado === "pendiente").length;

  // De la misma forma, filtro las tareas con el estado "completa" y cuento cuántas son.
  const completedTasks = tasks.filter((task) => task.estado === "completa").length;

  // Devuelvo un contenedor con la información calculada:
  // - Total de tareas
  // - Tareas pendientes
  // - Tareas completadas
  return (
    <div className="TasksCounterContainer">
      <p>Total de tareas: {totalTasks}</p> {/* Muestra cuántas tareas hay en total */}
      <p>Tareas pendientes: {pendingTasks}</p> {/* Muestra cuántas están pendientes */}
      <p>Tareas completadas: {completedTasks}</p> {/* Muestra cuántas se han completado */}
    </div>
  );
}

export default TasksCounterByHazel; // Exporto el componente para usarlo en otras partes de la app.
