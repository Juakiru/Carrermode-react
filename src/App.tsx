import { useState } from 'react';
import './App.css';
import { baseDeDatos } from './data.js';

// 1. DATOS ESTÁTICOS DECLARADOS ANTES DE USARSE
const DEPORTES = [
  { id: 'futbol', nombre: '⚽ Fútbol' },
  { id: 'basquet', nombre: '🏀 Básquetbol' },
  { id: 'volley', nombre: '🏐 Vóleibol' },
];

const LIGAS = [
  // Fútbol
  { id: 'premier', deporte: 'futbol', nombre: 'Premier League', color: '#3d195b', logo: '/logos/Premier_League.png' },
  { id: 'laliga', deporte: 'futbol', nombre: 'LaLiga', color: '#ee1522', logo: '/logos/Laliga.png' },
  { id: 'seriea', deporte: 'futbol', nombre: 'Serie A', color: '#008fd7', logo: '/logos/SerieA.png' },
  { id: 'bundesliga', deporte: 'futbol', nombre: 'Bundesliga', color: '#d3010c', logo: '/logos/Bundesliga.png' },
  { id: 'ligue1', deporte: 'futbol', nombre: 'Ligue 1', color: '#091c3e', logo: '/logos/ligue1.png' },
  { id: 'champions', deporte: 'futbol', nombre: 'Champions League', color: '#001438', logo: '/logos/Champions.png' },
  { id: 'chilena', deporte: 'futbol', nombre: 'Liga Chilena', color: '#002b7f', logo: '/logos/Ligachilena.png' },

  // Básquetbol
  { id: 'nba', deporte: 'basquet', nombre: 'NBA', color: '#1d428a', logo: '/logos/logonba.png' },

  // Vóleibol
  { id: 'vnl', deporte: 'volley', nombre: 'VNL', color: '#005596', logo: '/logos/logovnl.png' },
];

// 2. COMPONENTE PRINCIPAL (Padre)
export default function App() {
  const [deporteSeleccionado, setDeporteSeleccionado] = useState('futbol');
  const [ligaSeleccionada, setLigaSeleccionada] = useState<string | null>(null);

  // Filtrar ligas según el deporte activo
  const ligasVisibles = LIGAS.filter((l) => l.deporte === deporteSeleccionado);
  const ligaActual = LIGAS.find((l) => l.id === ligaSeleccionada);
  const datosLiga = ligaSeleccionada ? (baseDeDatos as any)[ligaSeleccionada] : null;

  const cambiarDeporte = (idDeporte: string) => {
    setDeporteSeleccionado(idDeporte);
    setLigaSeleccionada(null); // Limpia la liga al cambiar de deporte
  };

  const alternarLiga = (id: string) => {
    setLigaSeleccionada((prev) => (prev === id ? null : id));
  };

  return (
    <div className="app-container">
      <div className="content-box">
        {/* Encabezado */}
        <Encabezado
          logoActual={ligaActual ? ligaActual.logo : '/logos/balon.png'}
        />

        {/* Panel de contenido central */}
        <main className="main-panel">
          {/* Fila 1: Deportes */}
          <div className="sports-bar">
            {DEPORTES.map((dep) => (
              <button
                key={dep.id}
                onClick={() => cambiarDeporte(dep.id)}
                className={`sport-tab-btn ${deporteSeleccionado === dep.id ? 'active' : ''}`}
              >
                {dep.nombre}
              </button>
            ))}
          </div>

          {/* Fila 2: Ligas filtradas */}
          <div className="league-list">
            {ligasVisibles.map((liga) => (
              <BotonLiga
                key={liga.id}
                liga={liga}
                estaSeleccionada={ligaSeleccionada === liga.id}
                alHacerClick={alternarLiga}
              />
            ))}
          </div>

          {/* Banner de liga */}
          {ligaActual ? (
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <p style={{ color: '#000000', margin: '12px 0 4px 0', fontWeight: 'bold' }}>
                Liga seleccionada:
              </p>
              <h1 style={{ color: ligaActual.color, margin: 0 }}>
                {ligaActual.nombre}
              </h1>
            </div>
          ) : (
            <p className="empty-message">
              Selecciona una competición arriba para ver sus partidos y resultados.
            </p>
          )}

          {/* Tabla de posiciones (arriba) */}
          {datosLiga && datosLiga.equipos && (
            <TablaPosiciones equipos={datosLiga.equipos} />
          )}

          {/* Partidos (abajo) */}
          {datosLiga && datosLiga.partidos && (
            <div className="matches-section" style={{ marginTop: '28px' }}>
              <h2 className="section-title">Partidos de {ligaActual?.nombre}</h2>
              <div className="matches-grid">
                {datosLiga.partidos.map((partido: any) => (
                  <TarjetaPartido key={partido.id} partido={partido} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// 3. ENCABEZADO
function Encabezado({ logoActual }: { logoActual: string }) {
  return (
    <header className="header-card">
      <div className="profile-bar">
        <div className="avatar">
          <img src={logoActual} alt="Logo de la liga" className="avatar-img" />
        </div>
        <div className="profile-text">
          <h2>Gestión de Torneos Deportivos</h2>
          <p>Equipos, partidos, resultados y tabla de posiciones</p>
        </div>
      </div>
    </header>
  );
}

// 4. BOTÓN LIGA
function BotonLiga({
  liga,
  estaSeleccionada,
  alHacerClick,
}: {
  liga: any;
  estaSeleccionada: boolean;
  alHacerClick: (id: string) => void;
}) {
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

// 5. TARJETA PARTIDO
function TarjetaPartido({ partido }: { partido: any }) {
  const finalizado = partido.estado === 'Finalizado';

  return (
    <div className="match-card">
      <div className="match-team local">
        <span className="team-name">{partido.local}</span>
      </div>

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

      <div className="match-team visita">
        <span className="team-name">{partido.visita}</span>
      </div>
    </div>
  );
}

// 6. TABLA DE POSICIONES
function TablaPosiciones({ equipos }: { equipos: any[] }) {
  const [idFavorito, setIdFavorito] = useState<number | null>(null);
  const equiposOrdenados = [...equipos].sort((a, b) => b.puntos - a.puntos);

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
            {equiposOrdenados.map((equipo, index) => {
              const esFavorito = idFavorito === equipo.id;

              return (
                <tr
                  key={equipo.id}
                  onClick={() => setIdFavorito(esFavorito ? null : equipo.id)}
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

