import { useState, useEffect } from 'react';
import './App.css';
import { baseDeDatos } from './data.js';

// 1. COMPONENTE PRINCIPAL (Padre)
export default function App() {
  const [ligaSeleccionada, setLigaSeleccionada] = useState(null);
// Memoria del componente
  const [datosLiga, setDatosLiga] = useState(null);
  const [cargando, setCargando] = useState(false);

  const ligaActual = LIGAS.find((l) => l.id === ligaSeleccionada);

  // EFECTO DE CARGA ASÍNCRONA 
  useEffect(() => {
    if (ligaSeleccionada) {
      setCargando(true); // Encendemos el estado de carga
      
      const temporizador = setTimeout(() => {
        setDatosLiga(baseDeDatos[ligaSeleccionada]); // Cargamos los datos después de 1.5s
        setCargando(false); // Apagamos la carga
      }, 1500);

      return () => clearTimeout(temporizador); // Limpieza
    } else {
      setDatosLiga(null); // Si no hay liga, vaciamos los datos
    }
  }, [ligaSeleccionada]);

  const alternarLiga = (id) => {
    setLigaSeleccionada((prev) => (prev === id ? null : id));
  };

  return (
    <div className="app-container">
      <div className="content-box">
        <Encabezado
          logoActual={ligaActual ? ligaActual.logo : '/logos/balon.png'}
          ligaActiva={ligaSeleccionada}
          alCambiarLiga={alternarLiga}
        />

        <main className="main-panel">
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

          <p style={{ color: '#000000', marginTop: '20px' }}>Liga seleccionada:</p>
          <h1 style={{ color: ligaActual?.color, margin: '8px 0', minHeight: '40px' }}>
            {ligaActual?.nombre}
          </h1>

          {/* RENDERIZADO CONDICIONAL DE CARGA */}
          {cargando ? (
            <div className="loading-spinner">
              <h2>Cargando datos de {ligaActual?.nombre}... ⚽</h2>
            </div>
          ) : datosLiga ? (
            <div className="dashboard-grid">
              {/* Nueva sección: Tabla de Posiciones */}
              <TablaPosiciones equipos={datosLiga.equipos} />

              {/* Tu sección de partidos actual */}
              <div className="matches-section">
                <h2 className="section-title">Partidos</h2>
                <div className="matches-grid">
                  {datosLiga.partidos.map((partido) => (
                    <TarjetaPartido key={partido.id} partido={partido} />
                  ))}
                </div>
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
// 5.Tabla de Posiciones 
function TablaPosiciones({ equipos }) {
  // Estado local para el equipo favorito
  const [idFavorito, setIdFavorito] = useState(null);

  return (
    <div className="standings-section">
      <h2 className="section-title">Posiciones</h2>
      <div className="table-responsive">
        <table className="promiedos-table">
          <thead>
            <tr>
              <th>#</th>
              <th className="text-left">Equipo</th>
              <th>Pts</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo, index) => {
              const esFavorito = idFavorito === equipo.id;
              
              return (
                <tr 
                  key={equipo.id} 
                  onClick={() => setIdFavorito(equipo.id)}
                  className={esFavorito ? 'fila-favorito' : ''}
                  title="Haz clic para marcar como favorito"
                >
                  <td>{index + 1}</td>
                  <td className="text-left font-bold">{equipo.nombre}</td>
                  <td className="font-bold text-blue">{equipo.puntos}</td>
                  <td>{equipo.pj}</td>
                  <td>{equipo.pg}</td>
                  <td>{equipo.pe}</td>
                  <td>{equipo.pp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="hint-text">💡 Haz clic en un equipo para marcarlo como favorito</p>
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
