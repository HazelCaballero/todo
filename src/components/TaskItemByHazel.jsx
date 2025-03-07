import React from 'react'
import CallsTasksByHazel from '../services/CallsTasksByHazel';
import '../styles/TaskItemByHazel.css'

function TaskItemByHazel() {

    //logica va aqui

  return (
    <div className='TaskItemContainer'>
        <input type="checkbox" name="TaskCompleted" id="TaskCheckComplete/Imcomplete" />
        <strong className='TaskItemStyle'></strong>
        <button className='BtnEditar'>Editar</button>
        <button className='BtnEliminar'>Eliminar</button>
    </div>
  )
}

export default TaskItemByHazel