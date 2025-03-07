import React from 'react'
import TaskItemByHazel from '../components/TaskItemByHazel'
import TaskMakerByHazel from '../components/TaskMakerByHazel'
import TasksCounterByHazel from '../components/TasksCounterByHazel'
import TasksListShowByHazel from '../components/TasksListShowByHazel'

function AppToDoByHazel() {
  return (
    <div className='AppPageContainer'>
      <TaskMakerByHazel />
      <TaskItemByHazel />
      <TasksCounterByHazel />
      <TasksListShowByHazel />
    </div>
  )
}

export default AppToDoByHazel