// ============================================
// PetCareMini - Tipos e Interfaces
// ============================================

/** Representa un ítem de la checklist diaria */
export interface ChecklistItem {
  id: string;
  title: string;
  done: boolean;
}

/** Representa una actividad registrada */
export interface Activity {
  id: string;
  title: string;
  notes: string;
  date: string;
}

/** Perfil de la mascota */
export interface PetProfile {
  name: string;
  age: string;
  breed: string;
}
