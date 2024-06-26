// src/config/apiConfig.js
//const API_BASE_URL = "https://4ac6-179-49-21-45.ngrok-free.app/api/v1";
const API_BASE_URL = "http://192.168.2.124:3000/api/v1";
export const API_URLS = {
  getUser: (username, password) => `${API_BASE_URL}/point/${username}/${password}`,
  getEmpresas: (idUsuario) => `${API_BASE_URL}/point/list/empresa/${idUsuario}`,
  getUserBDD: (username, password, idEmpresa) => `${API_BASE_URL}/point/list/bddempresa/Greta/${username}/${password}/${idEmpresa}`,
  getEmpresaBodegas: (idUsuario, idEmpresa) => `${API_BASE_URL}/point/list/empresa/${idUsuario}/${idEmpresa}`,
  getListaHabitaciones: (selectedBodega, idEmpresa) => `${API_BASE_URL}/point/list/habitaciones/${selectedBodega}/${idEmpresa}`,  
};


