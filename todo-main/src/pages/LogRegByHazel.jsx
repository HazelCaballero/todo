import React from 'react'; // Importo React para usar componentes funcionales.
import LoginToDoApp from '../components/LoginToDoApp'; // Componente de inicio de sesión.
import RegisterToDoApp from '../components/RegisterToDoApp'; // Componente de registro.

function LogRegByHazel() {
  return (
    <div>
        {/* Renderizo el componente de inicio de sesión. */}
        <LoginToDoApp />
        {/* Renderizo el componente de registro. */}
        <RegisterToDoApp />
    </div>
  );
}

export default LogRegByHazel; // Exporto el componente para usarlo en otras partes de la aplicación.
