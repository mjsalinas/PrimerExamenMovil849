// ============================================
// Contexto: ActivityContext
// Maneja el estado compartido de actividades
// entre las pantallas AddActivityTab y HistoryTab
// ============================================
import { createContext, useContext, useState } from 'react';
import { Activity } from '../types';

/** Tipo del contexto */
interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

/** Valor por defecto del contexto */
const ActivityContext = createContext<ActivityContextType>({
  activities: [],
  addActivity: () => {},
  deleteActivity: () => {},
});

/** Hook para consumir el contexto de actividades */
export function useActivities() {
  return useContext(ActivityContext);
}

/** Provider que envuelve la app y comparte el estado de actividades */
export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (activity: Activity) => {
    setActivities((prev) => [activity, ...prev]);
  };

  const deleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity, deleteActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}
