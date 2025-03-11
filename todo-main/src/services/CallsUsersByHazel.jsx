// Función para obtener todas las tareas desde el servidor.
async function GetTasks() {
    try {
        // Realizo una solicitud GET al endpoint "/tasks" para obtener todas las tareas almacenadas.
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'GET', // Método GET para recuperar datos.
            headers: {
                'Content-Type': 'application/json' // Indico que quiero recibir datos en formato JSON.
            }
        });

        // Verifico si la respuesta es exitosa (status 200-299). Si no, lanzo un error.
        if (!response.ok) {
            throw new Error('Error fetching tasks'); // Error manejado para claridad.
        }

        // Devuelvo las tareas como un objeto JSON.
        return await response.json();
    } catch (error) {
        // Registro el error en la consola y lo relanzo para que pueda manejarse en el lugar donde se invoque.
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

// Función para agregar una nueva tarea al servidor.
async function PostTasks(usuarioDeTarea, tarea, estado) {
    try {
        // Defino el objeto que contiene los datos de la nueva tarea.
        const taskData = { usuarioDeTarea, tarea, estado };

        // Realizo una solicitud POST al endpoint "/tasks" para agregar una nueva tarea.
        const response = await fetch("http://localhost:3000/tasks", {
            method: 'POST', // Método POST para enviar datos.
            headers: {
                'Content-Type': 'application/json' // Aseguro que envío datos en formato JSON.
            },
            body: JSON.stringify(taskData) // Convierto el objeto en una cadena JSON antes de enviarlo.
        });

        // Si la respuesta no es exitosa (status >= 400), lanzo un error.
        if (!response.ok) {
            throw new Error('Error posting task');
        }

        // Devuelvo la tarea recién creada como un objeto JSON.
        return await response.json();
    } catch (error) {
        // Registro el error en la consola para depuración y lo relanzo.
        console.error('Error posting task:', error);
        throw error;
    }
}

// Función para actualizar una tarea existente en el servidor.
async function UpdateTasks(usuarioDeTarea, tarea, estado, id) {
    try {
        // Construyo el objeto que contiene los datos de la tarea actualizada.
        const taskData = { usuarioDeTarea, tarea, estado, id };

        // Realizo una solicitud PUT al endpoint específico de la tarea para actualizar sus datos.
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT', // Método PUT para modificar recursos existentes.
            headers: {
                'Content-Type': 'application/json' // Aseguro que envío datos en formato JSON.
            },
            body: JSON.stringify(taskData) // Convierto el objeto actualizado en una cadena JSON.
        });

        // Si la respuesta no es exitosa, lanzo un error detallando el ID de la tarea afectada.
        if (!response.ok) {
            throw new Error(`Error updating task with id ${id}`);
        }

        // Devuelvo los datos de la tarea actualizada como un objeto JSON.
        return await response.json();
    } catch (error) {
        // Registro el error y lo vuelvo a lanzar para manejarlo externamente.
        console.error('Error updating task:', error);
        throw error;
    }
}

// Función para eliminar una tarea existente en el servidor.
async function DeleteTask(id) {
    try {
        // Realizo una solicitud DELETE al endpoint específico de la tarea (por su ID).
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE', // Método DELETE para eliminar el recurso.
            headers: {
                'Content-Type': 'application/json' // Mantengo el encabezado aunque no envío datos.
            }
        });

        // Si la respuesta no es exitosa, lanzo un error indicando el ID de la tarea que no pudo eliminarse.
        if (!response.ok) {
            throw new Error(`Error deleting task with id ${id}`);
        }

        // Devuelvo un mensaje de confirmación para indicar que la tarea fue eliminada con éxito.
        return { message: `Task with id ${id} deleted successfully` };
    } catch (error) {
        // Registro el error en la consola para depuración y lo relanzo.
        console.error('Error deleting task:', error);
        throw error;
    }
}

// Exporto las funciones como un módulo para que puedan usarse en otras partes de la aplicación.
export default { GetTasks, PostTasks, UpdateTasks, DeleteTask };
