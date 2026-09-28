import { useState, useEffect } from 'react';
import './App.css';
import { baseDeDatos } from './data.js';

// 1. DATOS ESTÁTICOS DECLARADOS ANTES DE USARSE
const DEPORTES = [
  { id: 'futbol', nombre: ' Fútbol', logo: '/logos/balon.png' },
  { id: 'basquet', nombre: ' Básquetbol', logo: '/logos/logobasquet.png' },
  { id: 'volley', nombre: ' Vóleibol', logo: '/logos/logovolei.png' },
];

const LIGAS = [
  { id: 'premier', deporte: 'futbol', nombre: 'Premier League', color: '#3d195b', logo: '/logos/Premier_League.png' },
  { id: 'laliga', deporte: 'futbol', nombre: 'LaLiga', color: '#ee1522', logo: '/logos/Laliga.png' },
  { id: 'seriea', deporte: 'futbol', nombre: 'Serie A', color: '#008fd7', logo: '/logos/SerieA.png' },
  { id: 'bundesliga', deporte: 'futbol', nombre: 'Bundesliga', color: '#d3010c', logo: '/logos/Bundesliga.png' },
  { id: 'ligue1', deporte: 'futbol', nombre: 'Ligue 1', color: '#0ea5e9', logo: '/logos/ligue1.png' },
  { id: 'champions', deporte: 'futbol', nombre: 'Champions League', color: '#001438', logo: '/logos/Champions.png' },
  { id: 'chilena', deporte: 'futbol', nombre: 'Liga Chilena', color: '#002b7f', logo: '/logos/Ligachilena.png' },
  { id: 'nba', deporte: 'basquet', nombre: 'NBA', color: '#1d428a', logo: '/logos/logonba.png' },
  { id: 'vnl', deporte: 'volley', nombre: 'VNL', color: '#005596', logo: '/logos/logovnl.png' },
];

// 2. COMPONENTE PRINCIPAL (Padre)
export default function App() {
  const [deporteSeleccionado, setDeporteSeleccionado] = useState('futbol');
  const [ligaSeleccionada, setLigaSeleccionada] = useState<string | null>(null);

  // Estados para la carga asíncrona
  const [datosLiga, setDatosLiga] = useState<any>(null);
  const [cargando, setCargando] = useState(false);

  // Estado para la vista de Detalle del Equipo / Plantilla
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<any>(null);

  const ligasVisibles = LIGAS.filter((l) => l.deporte === deporteSeleccionado);
  const ligaActual = LIGAS.find((l) => l.id === ligaSeleccionada);
  const deporteActual = DEPORTES.find((d) => d.id === deporteSeleccionado);

  // Logo dinámico: Si hay liga elegida -> logo de la liga; si no -> logo del deporte activo
  const logoEncabezado = ligaActual?.logo || deporteActual?.logo || '/logos/balon.png';

  useEffect(() => {
    if (ligaSeleccionada) {
      setCargando(true);
      setEquipoSeleccionado(null); // Limpiamos el detalle al cambiar de liga
      
      const temporizador = setTimeout(() => {
        setDatosLiga((baseDeDatos as any)[ligaSeleccionada]);
        setCargando(false);
      }, 1500);

      return () => clearTimeout(temporizador);
    } else {
      setDatosLiga(null);
      setCargando(false);
    }
  }, [ligaSeleccionada]);

  const cambiarDeporte = (idDeporte: string) => {
    setDeporteSeleccionado(idDeporte);
    setLigaSeleccionada(null);
    setEquipoSeleccionado(null);
  };

  const alternarLiga = (id: string) => {
    setLigaSeleccionada((prev) => (prev === id ? null : id));
    setEquipoSeleccionado(null);
  };

  return (
    <div className="app-container">
      <div className="content-box">
        {/* Encabezado con logo reactivo al deporte y liga */}
        <Encabezado logoActual={logoEncabezado} />

        <main className="main-panel">
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

          {cargando ? (
            <div className="loading-spinner">
              <h2>Cargando datos... ⏳</h2>
            </div>
          ) : (
            <>
              {equipoSeleccionado ? (
                <DetalleEquipo 
                  equipo={equipoSeleccionado} 
                  partidosLiga={datosLiga?.partidos || []} 
                  alVolver={() => setEquipoSeleccionado(null)} 
                />
              ) : (
                <>
                  {datosLiga && datosLiga.equipos && (
                    <TablaPosiciones 
                      equipos={datosLiga.equipos} 
                      alVerDetalle={setEquipoSeleccionado} 
                    />
                  )}

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
                </>
              )}
            </>
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
function BotonLiga({ liga, estaSeleccionada, alHacerClick }: { liga: any; estaSeleccionada: boolean; alHacerClick: (id: string) => void; }) {
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
function TablaPosiciones({ equipos, alVerDetalle }: { equipos: any[], alVerDetalle: (equipo: any) => void }) {
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
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {equiposOrdenados.map((equipo, index) => (
              <tr key={equipo.id}>
                <td>{index + 1}</td>
                <td className="text-left font-bold">{equipo.nombre}</td>
                <td className="font-bold text-blue">{equipo.puntos}</td>
                <td>{equipo.pj}</td>
                <td>{equipo.pg}</td>
                <td>{equipo.pe}</td>
                <td>{equipo.pp}</td>
                <td>
                  <button 
                    onClick={() => alVerDetalle(equipo)}
                    style={{ padding: '6px 12px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 7. COMPONENTE DE DETALLE Y PLANTILLA DEL EQUIPO
function DetalleEquipo({
  equipo,
  partidosLiga,
  alVolver,
}: {
  equipo: any;
  partidosLiga: any[];
  alVolver: () => void;
}) {
  const partidosEquipo = partidosLiga.filter(
    (p) => p.local === equipo.nombre || p.visita === equipo.nombre
  );

  const tienePlantilla = equipo.plantilla && typeof equipo.plantilla === 'object';

  return (
    <div className="team-detail-view" style={{ textAlign: 'left', marginTop: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          Detalle del Club: <span style={{ color: '#00d285' }}>{equipo.nombre}</span>
        </h2>
        <button
          onClick={alVolver}
          style={{
            padding: '8px 16px',
            backgroundColor: '#334155',
            color: '#f8fafc',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ← Volver a la tabla
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ background: '#1a2436', padding: '12px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Puntos: </span>
          <strong style={{ color: '#00d285', fontSize: '1.2rem' }}>{equipo.puntos}</strong>
        </div>
        <div style={{ background: '#1a2436', padding: '12px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Partidos Jugados: </span>
          <strong style={{ color: '#ffffff' }}>{equipo.pj}</strong>
        </div>
        <div style={{ background: '#1a2436', padding: '12px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Victorias: </span>
          <strong style={{ color: '#38bdf8' }}>{equipo.pg}</strong>
        </div>
      </div>

      {/* Plantilla dividida por posiciones según data.js */}
      <h3 className="section-title" style={{ fontSize: '1.1rem' }}>Plantilla de Jugadores</h3>
      {tienePlantilla ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          {equipo.plantilla.arqueros && (
            <div style={{ background: '#1a2436', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ color: '#38bdf8', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}> Arqueros</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#f1f5f9', fontSize: '0.9rem' }}>
                {equipo.plantilla.arqueros.map((j: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{j}</li>
                ))}
              </ul>
            </div>
          )}

          {equipo.plantilla.defensas && (
            <div style={{ background: '#1a2436', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ color: '#38bdf8', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}> Defensas</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#f1f5f9', fontSize: '0.9rem' }}>
                {equipo.plantilla.defensas.map((j: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{j}</li>
                ))}
              </ul>
            </div>
          )}

          {equipo.plantilla.mediocentros && (
            <div style={{ background: '#1a2436', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ color: '#38bdf8', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}> Mediocentros</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#f1f5f9', fontSize: '0.9rem' }}>
                {equipo.plantilla.mediocentros.map((j: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{j}</li>
                ))}
              </ul>
            </div>
          )}

          {equipo.plantilla.delanteros && (
            <div style={{ background: '#1a2436', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ color: '#38bdf8', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}> Delanteros</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#f1f5f9', fontSize: '0.9rem' }}>
                {equipo.plantilla.delanteros.map((j: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{j}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p className="empty-message" style={{ textAlign: 'left', marginBottom: '24px' }}>
          No hay jugadores registrados en la plantilla de este equipo todavía en data.js.
        </p>
      )}

      {/* Partidos disputados por este club */}
      <h3 className="section-title" style={{ fontSize: '1.1rem' }}>Partidos del Club</h3>
      <div className="matches-grid">
        {partidosEquipo.length > 0 ? (
          partidosEquipo.map((partido) => (
            <TarjetaPartido key={partido.id} partido={partido} />
          ))
        ) : (
          <p className="empty-message" style={{ textAlign: 'left' }}>No hay partidos registrados para este equipo.</p>
        )}
      </div>
    </div>
  );
}