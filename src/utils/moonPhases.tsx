// src/utils/moonPhases.tsx
import { 
    WiMoonNew, WiMoonWaxingCrescent3, WiMoonFirstQuarter, WiMoonWaxingGibbous3,
    WiMoonFull, WiMoonWaningGibbous3, WiMoonThirdQuarter, WiMoonWaningCrescent3
  } from "react-icons/wi";
  import type { MoonPhaseInfo } from '../types/moon';
  
  // Record<string, ...> garante que as chaves sejam strings
  export const MOON_PHASES: Record<string, MoonPhaseInfo> = {
    "New Moon": { 
      label: "Lua Nova", 
      icon: <WiMoonNew />, 
      desc: "Início do ciclo. Momento de plantar sementes." 
    },
    "Waxing Crescent": { 
      label: "Lua Crescente Côncava", 
      icon: <WiMoonWaxingCrescent3 />, 
      desc: "Primeiros passos e intenções."
    },
    "First Quarter": { 
      label: "Quarto Crescente", 
      icon: <WiMoonFirstQuarter />, 
      desc: "Ação e movimento."
    },
    "Waxing Gibbous": { 
      label: "Crescente Gibosa", 
      icon: <WiMoonWaxingGibbous3 />, 
      desc: "Aprimoramento e ajustes."
    },
    "Full Moon": { 
      label: "Lua Cheia", 
      icon: <WiMoonFull />, 
      desc: "Iluminação total e colheita."
    },
    "Waning Gibbous": { 
      label: "Minguante Gibosa", 
      icon: <WiMoonWaningGibbous3 />, 
      desc: "Gratidão e compartilhamento."
    },
    "Last Quarter": { 
      label: "Quarto Minguante", 
      icon: <WiMoonThirdQuarter />, 
      desc: "Liberação e perdão."
    },
    "Waning Crescent": { 
      label: "Minguante Côncava", 
      icon: <WiMoonWaningCrescent3 />, 
      desc: "Descanso e cura."
    }
  };