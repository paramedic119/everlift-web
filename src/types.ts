export interface Backoff {
  rpe: number | null;
  percentRm: number | null;
  sets: number | null;
  repRange: string | null;
  intervalSec: number | null;
  refKg: number | null;
}
export interface Exercise {
  part: string | null;
  name: string;
  rpe: number | null;
  percentRm: number | null;
  sets: number | null;
  repRange: string | null;
  intervalSec: number | null;
  refKg: number | null;
  note: string | null;
  backoff: Backoff | null;
}
export interface Day { id: string; label: string; type: string; exercises: Exercise[]; }
export interface Week { week: number; days: Day[]; }
export interface SummaryWeek { week: number; totalSets?: number; avgRpe?: number; totalReps?: number; totalKg?: number; }
export interface Personal {
  big3: { squat: number|null; bench: number|null; deadlift: number|null; highbarSquat: number|null; shoulderPress: number|null; };
  profile: { heightCm: number|null; weightKg: number|null; mode: string|null; dailyIntensity: string|null; trainingLevel: string|null; };
  nutrition: { maintenanceKcal: number|null; overKcal: number|null; underKcal: number|null; proteinPerMeal: number|null; targetKcal: number|null; p: number|null; f: number|null; c: number|null; };
}

export interface SetLog { kg: number | null; reps: number | null; done: boolean; }
export interface ExerciseLog { sets: SetLog[]; memo: string; }
export type ProgressState = Record<string, Record<string, Record<number, ExerciseLog>>>;
