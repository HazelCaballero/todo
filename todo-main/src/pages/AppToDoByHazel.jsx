import React, { useState, useEffect } from "react";
import TaskItemByHazel from "../components/TaskItemByHazel";
import TaskMakerByHazel from "../components/TaskMakerByHazel";
import TasksCounterByHazel from "../components/TasksCounterByHazel";
import CallsTasksByHazel from "../services/CallsTasksByHazel"; // Importo el servicio para obtener las tareas iniciales.
import Swal from "sweetalert2";
import "../styles/AppToDoByHazel.css";

function AppToDoByHazel() {
  // Defino el estado centralizado para manejar todas las tareas.
  const [tasks, setTasks] = useState([]);

  // Este efecto se encarga de cargar las tareas desde la API cuando el componente se monta.
  useEffect(() => {
    async function fetchTasks() {
      try {
        // Llamo al servicio que trae las tareas desde el backend.
        const fetchedTasks = await CallsTasksByHazel.GetTasks();
        setTasks(fetchedTasks); // Actualizo el estado con las tareas obtenidas.
      } catch (error) {
        // Si hay algún problema al obtener las tareas, muestro una alerta al usuario.
        Swal.fire({
          icon: "error",
          title: "Error al cargar tareas",
          text: "No se pudieron obtener las tareas. Por favor, inténtalo nuevamente."
        });
      }
    }
    fetchTasks(); // Ejecuto la función cuando el componente se monta por primera vez.
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente.

  return (
    <div className="AppPageContainer">
      {/* Aquí incluyo el componente que permite crear nuevas tareas. */}
      <div className="TMakerContainer"><TaskMakerByHazel tasks={tasks} setTasks={setTasks} /></div>
      
      {/* Este componente muestra un resumen del estado de las tareas: totales, pendientes y completadas. */}
      <div className="TCounterContainer"><TasksCounterByHazel tasks={tasks} /></div>

      {/* Este componente se encarga de mostrar las tareas existentes y gestionarlas (editar, eliminar, completar). */}
      <div className="TItemContainer"><TaskItemByHazel tasks={tasks} setTasks={setTasks} /></div>

     
    </div>
  );
}

export default AppToDoByHazel; // Exporto el componente para poder usarlo en otras partes de la app.
