async function GetTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching tasks');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

async function PostTasks(usuario, tarea, estado ) {
    try {
        const userData = { usuario, tarea, estado};

        const response = await fetch("http://localhost:3000/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Error posting user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

async function UpdateTasks(nombre, email,password, id) {
    try {
        const userData = {nombre, email,password, id };

        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`Error updating user with id ${id}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function DeleteUser(id) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}


export default { GetTasks, PostTasks, UpdateTasks, DeleteUser };
