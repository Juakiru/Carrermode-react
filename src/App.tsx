import { useState } from 'react';
import './App.css';
import { baseDeDatos } from './data.js';

// 1. COMPONENTE PRINCIPAL (Padre)
export default function App() {
  const [ligaSeleccionada, setLigaSeleccionada] = useState<string | null>(null);

  // Buscar los datos de la liga activa
  const ligaActual = LIGAS.find((l) => l.id === ligaSeleccionada);

  // Obtiene los datos (equipos y partidos) de la liga activa desde data.js
  const datosLiga = ligaSeleccionada ? baseDeDatos[ligaSeleccionada] : null;

  // Función toggle: si es la misma, la pone en null; si es otra, pone la nueva
  const alternarLiga = (id: string) => {
    setLigaSeleccionada((prev) => (prev === id ? null : id));
  };
  

  return (
    <div className="app-container">
      <div className="content-box">
        {/* Encabezado con avatar y botones */}
        <Encabezado
          logoActual={ligaActual ? ligaActual.logo : '/logos/balon.png'}
          ligaActiva={ligaSeleccionada}
          alCambiarLiga={alternarLiga}
        />

        {/* Panel de contenido central */}
        <main className="main-panel">
          {/* Los botones aquí adentro */}
          <div className="league-list">
            {LIGAS.map((liga) => (
            <BotonLiga
            key={liga.id}
            liga={liga}
            estaSeleccionada={ligaSeleccionada === liga.id}
            alHacerClick={alternarLiga}
          />
          ))}
          </div>
          {/* 2. Bloque de Liga Seleccionada */}
          <p style={{ color: '#000000', marginTop: '20px' }}>Liga seleccionada:</p>
        <h1 style={{ color: ligaActual?.color, margin: '8px 0' }}>
          {ligaActual?.nombre}
        </h1>
          {/* 3. Lista de partidos */}
          {datosLiga ? (
            <div className="matches-section">
              <h2 className="section-title">Partidos de {ligaActual?.nombre}</h2>
              <div className="matches-grid">
                {datosLiga.partidos.map((partido) => (
                  <TarjetaPartido key={partido.id} partido={partido} />
                ))}
              </div>
            </div>
          ) : (
            <p className="empty-message">
              Selecciona una competición arriba para ver sus partidos y resultados.
            </p>
          )}
      </main>
      </div>
    </div>
  );
}

// 2. COMPONENTE INTERMEDIO: Encabezado, perfil y lista horizontal
function Encabezado({ logoActual, ligaActiva, alCambiarLiga }) {
  return (
    <header className="header-card">
      <div className="profile-bar">
        <div className="avatar">
        <img 
        src={logoActual} 
        alt="Logo de la liga" 
        className="avatar-img" />
        </div>
        <div className="profile-text">
          <h2>Gestión de Torneos Deportivos</h2>
          <p>Equipos, partidos, resultados y tabla de posiciones</p>
        </div>
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

// Componente que representa un único partido
function TarjetaPartido({ partido }) {
  const finalizado = partido.estado === 'Finalizado';

  return (
    <div className="match-card">
      {/* Equipo Local */}
      <div className="match-team local">
        <span className="team-name">{partido.local}</span>
      </div>

      {/* Marcador o VS central */}
      <div className="match-score">
        {finalizado ? (
          <span className="score-badge finalizado">
            {partido.golesLocal} - {partido.golesVisita}
          </span>
        ) : (
          <span className="score-badge por-jugar">VS</span>
        )}
        <span className="match-status">{partido.estado}</span>
      </div>

      {/* Equipo Visita */}
      <div className="match-team visita">
        <span className="team-name">{partido.visita}</span>
      </div>
    </div>
  );
}



// 4. DATOS ESTÁTICOS DE APOYO
const LIGAS = [
  { id: 'premier', nombre: 'Premier League', color: '#3d195b', logo:'/logos/Premier_League.png' },
  { id: 'laliga', nombre: 'LaLiga', color: '#ee1522', logo: 'logos/Laliga.png' },
  { id: 'seriea', nombre: 'Serie A', color: '#008fd7', logo: 'logos/SerieA.png' },
  { id: 'bundesliga', nombre: 'Bundesliga', color: '#d3010c', logo: 'logos/Bundesliga.png' },
  { id: 'ligue1', nombre: 'Ligue 1', color: '#091c3e', logo: 'logos/ligue1.png' },
  { id: 'champions', nombre: 'Champions League', color: '#001438', logo: 'logos/Champions.png' },
  { id: 'chilena', nombre: 'Liga Chilena', color: '#002b7f', logo: 'logos/Ligachilena.png' },
];