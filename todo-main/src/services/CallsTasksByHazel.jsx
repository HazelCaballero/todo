// Función para obtener todas las tareas desde el servidor.
async function GetTasks() {
    try {
        // Hago una solicitud GET al endpoint para obtener las tareas.
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Aseguro que los datos sean JSON.
            }
        });

        // Si la respuesta no es exitosa (status >= 400), lanzo un error.
        if (!response.ok) {
            throw new Error('Error fetching tasks');
        }

        // Devuelvo las tareas parseadas como JSON.
        return await response.json();
    } catch (error) {
        // Si algo falla, lo registro en la consola y vuelvo a lanzar el error.
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

// Función para agregar una nueva tarea al servidor.
async function PostTasks(usuarioDeTarea, tarea, estado,idUsuario,nombreUsuario) {
    try {
        // Construyo un objeto con los datos de la nueva tarea.
        const taskData = { usuarioDeTarea, tarea, estado,idUsuario,nombreUsuario };

        // Hago una solicitud POST al endpoint para crear una tarea.
        const response = await fetch("http://localhost:3000/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifico que los datos que envío son JSON.
            },
            body: JSON.stringify(taskData) // Convierto el objeto tarea en una cadena JSON.
        });

        // Si la respuesta no es exitosa, lanzo un error.
        if (!response.ok) {
            throw new Error('Error posting task');
        }

        // Devuelvo la tarea recién creada parseada como JSON.
        return await response.json();
    } catch (error) {
        // Registro el error en la consola y lo vuelvo a lanzar.
        console.error('Error posting task:', error);
        throw error;
    }
}

// Función para actualizar una tarea existente en el servidor.
async function UpdateTasks(usuarioDeTarea, tarea, estado, id) {
    try {
        // Construyo un objeto con los datos actualizados de la tarea.
        const taskData = { usuarioDeTarea, tarea, estado, id };

        // Hago una solicitud PUT al endpoint específico de la tarea para actualizarla.
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Aseguro que los datos enviados sean JSON.
            },
            body: JSON.stringify(taskData) // Convierto el objeto tarea actualizado en una cadena JSON.
        });

        // Si la respuesta no es exitosa, lanzo un error.
        if (!response.ok) {
            throw new Error(`Error updating task with id ${id}`);
        }

        // Devuelvo la tarea actualizada parseada como JSON.
        return await response.json();
    } catch (error) {
        // Registro el error en la consola y lo vuelvo a lanzar.
        console.error('Error updating task:', error);
        throw error;
    }
}

// Función para eliminar una tarea existente en el servidor.
async function DeleteTask(id) {
    try {
        // Hago una solicitud DELETE al endpoint específico de la tarea.
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // No envío datos, pero mantengo el encabezado estándar.
            }
        });

        // Si la respuesta no es exitosa, lanzo un error.
        if (!response.ok) {
            throw new Error(`Error deleting task with id ${id}`);
        }

        // Devuelvo un mensaje de confirmación.
        return { message: `Task with id ${id} deleted successfully` };
    } catch (error) {
        // Registro el error en la consola y lo vuelvo a lanzar.
        console.error('Error deleting task:', error);
        throw error;
    }
}

// Exporto las funciones para que puedan ser utilizadas en otras partes de la aplicación.
export default { GetTasks, PostTasks, UpdateTasks, DeleteTask };
