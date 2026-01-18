import { useState, useEffect } from 'react';
import axios from 'axios';
import { MOON_PHASES } from '../utils/moonPhases';
import type { AstronomyResponse, MoonPhaseInfo } from '../types/moon';
import '../styles/moon.scss';

// Interface para o estado de localização
interface LocationCoords {
  lat: number;
  lon: number;
}

export function MoonDashboard() {
  // Tipando os estados
  const [moonData, setMoonData] = useState<AstronomyResponse | null>(null);
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Geolocalização
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocalização não suportada");
      setLocation({ lat: -23.5505, lon: -46.6333 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        console.error("Erro ao pegar local:", error);
        setLocation({ lat: -23.5505, lon: -46.6333 }); 
      }
    );
  }, []);

  // 2. Fetch da API
  useEffect(() => {
    if (!location) return;

    const fetchMoonData = async () => {
      try {
        // No Vite, usamos import.meta.env
        const API_KEY = import.meta.env.VITE_API_KEY; 
        
        if (!API_KEY) {
            console.error("API KEY não encontrada no .env");
            return;
        }

        const { lat, lon } = location;
        
        // O axios já pode receber o tipo genérico <AstronomyResponse>
        const response = await axios.get<AstronomyResponse>(
          `http://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${lat},${lon}`
        );
        
        setMoonData(response.data);
      } catch (error) {
        console.error("Erro na API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoonData();
  }, [location]);

  if (loading) return <div className="loading">Carregando astros...</div>;
  if (!moonData) return <div className="error">Erro ao carregar dados.</div>;

  const { astro } = moonData.astronomy;
  const region = moonData.location.name;
  
  // O TS pode reclamar se a chave não existir, então usamos um fallback seguro
  const phaseKey = astro.moon_phase;
  const currentPhase: MoonPhaseInfo = MOON_PHASES[phaseKey] || MOON_PHASES["New Moon"];

  return (
    <div className="moon-container">
      <div className="moon-card">
        <div className="header">
          <h2>Fase Atual</h2>
          <span className="location-badge">📍 {region}</span>
        </div>

        <div className="main-display">
          <div 
            className="moon-icon-wrapper" 
            style={{ textShadow: `0 0 ${astro.moon_illumination}px #fff` }}
          >
            {currentPhase.icon}
          </div>
          <h1 className="phase-title">{currentPhase.label}</h1>
          <p className="phase-desc">{currentPhase.desc}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <span>Iluminação</span>
            <strong>{astro.moon_illumination}%</strong>
            <div className="progress-bar">
              <div style={{ width: `${astro.moon_illumination}%` }} />
            </div>
          </div>
          
          <div className="stat-box">
            <span>Nascer da Lua</span>
            <strong>{astro.moonrise}</strong>
          </div>

          <div className="stat-box">
            <span>Pôr da Lua</span>
            <strong>{astro.moonset}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}