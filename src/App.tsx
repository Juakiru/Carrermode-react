import { useState, useEffect } from 'react';
import './App.css';
import { baseDeDatos } from './data.js';

// 1. DATOS ESTÁTICOS DECLARADOS ANTES DE USARSE
const DEPORTES = [
  { id: 'futbol', nombre: '⚽ Fútbol' },
  { id: 'basquet', nombre: '🏀 Básquetbol' },
  { id: 'volley', nombre: '🏐 Vóleibol' },
];

const LIGAS = [
  { id: 'premier', deporte: 'futbol', nombre: 'Premier League', color: '#3d195b', logo: '/logos/Premier_League.png' },
  { id: 'laliga', deporte: 'futbol', nombre: 'LaLiga', color: '#ee1522', logo: '/logos/Laliga.png' },
  { id: 'seriea', deporte: 'futbol', nombre: 'Serie A', color: '#008fd7', logo: '/logos/SerieA.png' },
  { id: 'bundesliga', deporte: 'futbol', nombre: 'Bundesliga', color: '#d3010c', logo: '/logos/Bundesliga.png' },
  { id: 'ligue1', deporte: 'futbol', nombre: 'Ligue 1', color: '#091c3e', logo: '/logos/ligue1.png' },
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

  // Estado para la vista de Detalle del Equipo
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<any>(null);

  const ligasVisibles = LIGAS.filter((l) => l.deporte === deporteSeleccionado);
  const ligaActual = LIGAS.find((l) => l.id === ligaSeleccionada);

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
    }
  }, [ligaSeleccionada]);

  const cambiarDeporte = (idDeporte: string) => {
    setDeporteSeleccionado(idDeporte);
    setLigaSeleccionada(null);
  };

  const alternarLiga = (id: string) => {
    setLigaSeleccionada((prev) => (prev === id ? null : id));
  };

  return (
    <div className="app-container">
      <div className="content-box">
        <Encabezado logoActual={ligaActual ? ligaActual.logo : '/logos/balon.png'} />

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
                  partidosLiga={datosLiga.partidos} 
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

// 7. COMPONENTE: VISTA DE DETALLE DE EQUIPO
function DetalleEquipo({ equipo, partidosLiga, alVolver }: { equipo: any, partidosLiga: any[], alVolver: () => void }) {
  const misPartidos = partidosLiga.filter(
    (p: any) => p.local === equipo.nombre || p.visita === equipo.nombre
  );

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', color: '#0f172a', textAlign: 'left' }}>
      <button 
        onClick={alVolver} 
        style={{ padding: '8px 16px', backgroundColor: '#334155', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
      >
        ⬅ Volver a la tabla
      </button>
      
      <h2 style={{ fontSize: '2rem', margin: '0 0 20px 0', color: '#1e293b' }}>{equipo.nombre}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div>
          <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>📋 Plantilla</h3>
          {equipo.plantilla ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1rem' }}>🧤 Arqueros</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
                  {equipo.plantilla.arqueros?.map((j: string, i: number) => <li key={i} style={{ padding: '2px 0' }}>{j}</li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1rem' }}>🛡️ Defensas</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
                  {equipo.plantilla.defensas?.map((j: string, i: number) => <li key={i} style={{ padding: '2px 0' }}>{j}</li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1rem' }}>👟 Mediocentros</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
                  {equipo.plantilla.mediocentros?.map((j: string, i: number) => <li key={i} style={{ padding: '2px 0' }}>{j}</li>)}
                </ul>
              </div>
              <div>
                <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1rem' }}>⚽ Delanteros</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
                  {equipo.plantilla.delanteros?.map((j: string, i: number) => <li key={i} style={{ padding: '2px 0' }}>{j}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>No hay datos de la plantilla registrados.</p>
          )}
        </div>

        <div>
          <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>🏟️ Partidos de {equipo.nombre}</h3>
          {misPartidos.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {misPartidos.map((p: any) => (
                <TarjetaPartido key={p.id} partido={p} />
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b' }}>No hay partidos programados.</p>
          )}
        </div>
      </div>
    </div>
  );
}