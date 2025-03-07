import React from 'react'
import CallsTasksByHazel from '../services/CallsTasksByHazel';
import '../styles/LoginToDoApp.css'

function LoginToDoApp() {
  return (
    <div className='LoginToDoContainer'>

      <label htmlFor="">Nombre de Usuario</label>
        <input  type="text" />
      <label htmlFor="">Contraseña</label>
         <input type="text" />
      <button>Iniciar</button>
      <p>¿No tienes cuenta?</p>

    </div>
  )
}

export default LoginToDoApp