import React from 'react'; // Importo React para usar componentes funcionales.
import LoginToDoApp from '../components/LoginToDoApp'; // Componente de inicio de sesión.
import RegisterToDoApp from '../components/RegisterToDoApp'; // Componente de registro.
import '../styles/LogRegByHazel.css'

function LogRegByHazel() {
  return (
    <div className='LogRegContainer'>
      <div className='regContainer'>
        {/* Renderizo el componente de registro. */}
        <RegisterToDoApp />
      </div>
      <div className='logContainer'>
        {/* Renderizo el componente de inicio de sesión. */}
        <LoginToDoApp />
      </div>
    </div>
  );
}

export default LogRegByHazel; // Exporto el componente para usarlo en otras partes de la aplicación.
