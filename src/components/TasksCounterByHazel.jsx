import React from 'react'
import CallsTasksByHazel from '../services/CallsTasksByHazel';
import '../styles/TasksCounterByHazel.css'

function TasksCounterByHazel() {

  //logica va aqui
  
  return (
    <div className='TaskCounterContainer'>
        <div className='CircleContainer'>
            <h3>Tareas Completadas</h3>
            <strong className='CounterTaskStyle'></strong>
        </div>
    </div>
  )
}

export default TasksCounterByHazel