import React from 'react'

function RegisterToDoApp() {
  return (
    <div className='RegisterToDoAppContainer'>

        <label >Nombre</label>
        <input type="text" />
        <br />
        <label >Email</label>
        <input  type="text" />
        <br />
        <label >Password</label>
        <input  type="text" />
        <button  >Registrarse</button>

        <p>¿Ya tienes una cuenta? </p>

    </div>
  )
}

export default RegisterToDoApp