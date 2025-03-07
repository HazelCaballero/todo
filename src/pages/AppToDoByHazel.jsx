import React from 'react'
import TaskItemByHazel from '../components/TaskItemByHazel'
import TaskMakerByHazel from '../components/TaskMakerByHazel'
import TasksCounterByHazel from '../components/TasksCounterByHazel'
import TasksListShowByHazel from '../components/TasksListShowByHazel'
import LoginToDoApp from '../components/LoginToDoApp'
import RegisterToDoApp from '../components/RegisterToDoApp'

function AppToDoByHazel() {
  return (
    <div className='AppPageContainer'>
      <TaskMakerByHazel />
      <TaskItemByHazel />
      <TasksCounterByHazel />
      <TasksListShowByHazel />
      <LoginToDoApp />
      <RegisterToDoApp />
    </div>
  )
}

export default AppToDoByHazel