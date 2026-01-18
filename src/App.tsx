// 1. Importe o componente que criamos
import { MoonDashboard } from './components/MoonDashboard';

// 2. Pode remover os imports dos logos (reactLogo, viteLogo) e do useState se não for usar

import './App.css'; // Mantenha apenas se tiver estilos globais que você quer usar

function App() {
  // Removemos o estado do contador (count), pois não precisamos dele aqui

  return (
    // 3. Renderizamos apenas o nosso Dashboard
    <>
      <MoonDashboard />
    </>
  )
}

export default App