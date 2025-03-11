import './App.css'; // Importo los estilos globales para la aplicación.
import RoutingByHazel from './routes/RoutingByHazel'; // Importo el componente que maneja todas las rutas.

function App() {
  return (
    <>
      {/* Contenedor principal de la aplicación */}
      <div className='AppContainer'>
        {/* Incluyo el componente RoutingByHazel, que se encargará de gestionar las rutas de la app */}
        <RoutingByHazel />
      </div>
    </>
  );
}

export default App; // Exporto el componente para que se use como el punto de entrada en el index.js.
