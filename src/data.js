// data.js

export const baseDeDatos = {
    premier: {
      equipos: [
        { id: 1, nombre: "Manchester City", puntos: 12, pj: 4, pg: 4, pe: 0, pp: 0 },
        { id: 2, nombre: "Arsenal", puntos: 10, pj: 4, pg: 3, pe: 1, pp: 0 },
        { id: 3, nombre: "Liverpool", puntos: 9, pj: 4, pg: 3, pe: 0, pp: 1 },
        { id: 4, nombre: "Manchester United", puntos: 6, pj: 4, pg: 2, pe: 0, pp: 2 }
      ],
      partidos: [
        { id: 101, local: "Manchester City", visita: "Arsenal", golesLocal: 2, golesVisita: 2, estado: "Finalizado" },
        { id: 102, local: "Liverpool", visita: "Manchester United", golesLocal: null, golesVisita: null, estado: "15:30 hs" }
      ]
    },
    laliga: {
      equipos: [
        { id: 5, nombre: "Real Madrid", puntos: 15, pj: 5, pg: 5, pe: 0, pp: 0 },
        { id: 6, nombre: "Barcelona", puntos: 13, pj: 5, pg: 4, pe: 1, pp: 0 },
        { id: 7, nombre: "Atlético Madrid", puntos: 9, pj: 5, pg: 2, pe: 3, pp: 0 },
        { id: 8, nombre: "Sevilla", puntos: 4, pj: 5, pg: 1, pe: 1, pp: 3 }
      ],
      partidos: [
        { id: 201, local: "Real Madrid", visita: "Barcelona", golesLocal: 3, golesVisita: 1, estado: "Finalizado" },
        { id: 202, local: "Atlético Madrid", visita: "Sevilla", golesLocal: null, golesVisita: null, estado: "Mañana" }
      ]
    },
    seriea: {
      equipos: [
        { id: 9, nombre: "Inter de Milán", puntos: 10, pj: 4, pg: 3, pe: 1, pp: 0 },
        { id: 10, nombre: "AC Milan", puntos: 9, pj: 4, pg: 3, pe: 0, pp: 1 },
        { id: 11, nombre: "Juventus", puntos: 8, pj: 4, pg: 2, pe: 2, pp: 0 },
        { id: 12, nombre: "Napoli", puntos: 6, pj: 4, pg: 2, pe: 0, pp: 2 }
      ],
      partidos: [
        { id: 301, local: "Inter de Milán", visita: "AC Milan", golesLocal: 2, golesVisita: 1, estado: "Finalizado" },
        { id: 302, local: "Juventus", visita: "Napoli", golesLocal: 0, golesVisita: 0, estado: "Finalizado" }
      ]
    },
    bundesliga: {
      equipos: [
        { id: 13, nombre: "Bayern Múnich", puntos: 9, pj: 3, pg: 3, pe: 0, pp: 0 },
        { id: 14, nombre: "Bayer Leverkusen", puntos: 7, pj: 3, pg: 2, pe: 1, pp: 0 },
        { id: 15, nombre: "Borussia Dortmund", puntos: 6, pj: 3, pg: 2, pe: 0, pp: 1 },
        { id: 16, nombre: "RB Leipzig", puntos: 4, pj: 3, pg: 1, pe: 1, pp: 1 }
      ],
      partidos: [
        { id: 401, local: "Bayer Leverkusen", visita: "Bayern Múnich", golesLocal: 2, golesVisita: 2, estado: "Finalizado" },
        { id: 402, local: "Borussia Dortmund", visita: "RB Leipzig", golesLocal: null, golesVisita: null, estado: "14:00 hs" }
      ]
    },
    ligue1: {
      equipos: [
        { id: 17, nombre: "PSG", puntos: 12, pj: 4, pg: 4, pe: 0, pp: 0 },
        { id: 18, nombre: "Mónaco", puntos: 9, pj: 4, pg: 3, pe: 0, pp: 1 },
        { id: 19, nombre: "Marsella", puntos: 7, pj: 4, pg: 2, pe: 1, pp: 1 },
        { id: 20, nombre: "Lyon", puntos: 3, pj: 4, pg: 1, pe: 0, pp: 3 }
      ],
      partidos: [
        { id: 501, local: "PSG", visita: "Marsella", golesLocal: 4, golesVisita: 0, estado: "Finalizado" },
        { id: 502, local: "Lyon", visita: "Mónaco", golesLocal: 1, golesVisita: 2, estado: "Finalizado" }
      ]
    },
    champions: {
      equipos: [
        { id: 21, nombre: "Real Madrid", puntos: 6, pj: 2, pg: 2, pe: 0, pp: 0 },
        { id: 22, nombre: "Manchester City", puntos: 6, pj: 2, pg: 2, pe: 0, pp: 0 },
        { id: 23, nombre: "Bayern Múnich", puntos: 4, pj: 2, pg: 1, pe: 1, pp: 0 },
        { id: 24, nombre: "PSG", puntos: 3, pj: 2, pg: 1, pe: 0, pp: 1 }
      ],
      partidos: [
        { id: 601, local: "Real Madrid", visita: "Bayern Múnich", golesLocal: null, golesVisita: null, estado: "21:00 hs" },
        { id: 602, local: "Manchester City", visita: "PSG", golesLocal: 3, golesVisita: 1, estado: "Finalizado" }
      ]
    },
    chilena: {
      equipos: [
        { id: 25, nombre: "Colo-Colo", puntos: 15, pj: 5, pg: 5, pe: 0, pp: 0 },
        { id: 26, nombre: "U. de Chile", puntos: 12, pj: 5, pg: 4, pe: 0, pp: 1 },
        { id: 27, nombre: "U. Católica", puntos: 10, pj: 5, pg: 3, pe: 1, pp: 1 },
        { id: 28, nombre: "Cobreloa", puntos: 7, pj: 5, pg: 2, pe: 1, pp: 2 }
      ],
      partidos: [
        { id: 701, local: "Colo-Colo", visita: "U. de Chile", golesLocal: 2, golesVisita: 1, estado: "Finalizado" },
        { id: 702, local: "U. Católica", visita: "Cobreloa", golesLocal: 0, golesVisita: 0, estado: "Finalizado" }
      ]
    }
  };