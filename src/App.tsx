import { useState } from 'react';
import './App.css';

// 1. COMPONENTE PRINCIPAL (Padre)
export default function App() {
  const [ligaSeleccionada, setLigaSeleccionada] = useState('premier');

  // Buscar la información de la liga activa
  const ligaActual = LIGAS.find((l) => l.id === ligaSeleccionada);

  return (
    <div className="app-container">
      <div className="content-box">
        {/* Encabezado con avatar y botones */}
        <Encabezado
          ligaActiva={ligaSeleccionada}
          alCambiarLiga={setLigaSeleccionada}
        />

        {/* Panel de contenido central */}
        <main className="main-panel">
          <p style={{ color: '#94a3b8' }}>Liga seleccionada:</p>
          <h1 style={{ color: ligaActual?.color, margin: '8px 0' }}>
            {ligaActual?.nombre}
          </h1>
        </main>
      </div>
    </div>
  );
}

// 2. COMPONENTE INTERMEDIO: Encabezado, perfil y lista horizontal
function Encabezado({ ligaActiva, alCambiarLiga }) {
  return (
    <header className="header-card">
      <div className="profile-bar">
        <div className="avatar">⚽</div>
        <div className="profile-text">
          <h2>Gestión de Torneos Deportivos</h2>
          <p>Equipos, partidos, resultados y tabla de posiciones</p>
        </div>
      </div>

      <div className="league-list">
        {LIGAS.map((liga) => (
          <BotonLiga
            key={liga.id}
            liga={liga}
            estaSeleccionada={ligaActiva === liga.id}
            alHacerClick={alCambiarLiga}
          />
        ))}
      </div>
    </header>
  );
}

// 3. COMPONENTE HIJO: Botón individual con hover y color dinámico
function BotonLiga({ liga, estaSeleccionada, alHacerClick }) {
  const [hover, setHover] = useState(false);

  const estiloDinamico = {
    backgroundColor: hover || estaSeleccionada ? liga.color : '',
    color: hover || estaSeleccionada ? '#ffffff' : '',
    borderColor: hover || estaSeleccionada ? liga.color : '',
  };

  return (
    <button
      className="league-btn"
      style={estiloDinamico}
      onClick={() => alHacerClick(liga.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {liga.nombre}
    </button>
  );
}

// 4. DATOS ESTÁTICOS DE APOYO
const LIGAS = [
  { id: 'premier', nombre: 'Premier League', color: '#3d195b' },
  { id: 'laliga', nombre: 'LaLiga', color: '#ee1522' },
  { id: 'seriea', nombre: 'Serie A', color: '#008fd7' },
  { id: 'bundesliga', nombre: 'Bundesliga', color: '#d3010c' },
  { id: 'ligue1', nombre: 'Ligue 1', color: '#091c3e' },
  { id: 'champions', nombre: 'Champions League', color: '#001438' },
  { id: 'chilena', nombre: 'Liga Chilena', color: '#002b7f' },
];