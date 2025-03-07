import React from 'react'
import CallsTasksByHazel from '../services/CallsTasksByHazel';
import '../styles/TaskMakerByHazel.css'

function TaskMakerByHazel() {

  
//logica va aqui

  
  return (
    <div className='TaskMakerContainer'>
        <input type="hidden" name="Usuario" />
        <label htmlFor="">Nueva tarea</label>
        <input className='WriteTask' type="text" placeholder='Ejemplo: Tarea de Ingles'/>
        <button className='BtnAddTask'>Agregar</button>
    </div>
  )
}

export default TaskMakerByHazel