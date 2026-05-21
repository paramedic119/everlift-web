import type { Exercise, Personal } from "../types";

function baseWeight(name: string, p: Personal): number | null {
  if (/ハイバースクワット/.test(name)) return p.big3.highbarSquat;
  if (/スクワット/.test(name))        return p.big3.squat;
  if (/デッドリフト/.test(name))       return p.big3.deadlift;
  if (/バーチカルプレス/.test(name))    return p.big3.shoulderPress;
  if (/ベンチプレス/.test(name))       return p.big3.bench;
  return null;
}

function round25(v: number): number {
  return Math.round(v / 2.5) * 2.5;
}

export function calcRefKg(ex: Exercise, p: Personal): number | null {
  if (ex.percentRm == null) return ex.refKg;
  const base = baseWeight(ex.name, p);
  if (base == null) return ex.refKg;
  return round25(base * ex.percentRm);
}

export function calcBackoffRefKg(ex: Exercise, p: Personal): number | null {
  if (!ex.backoff) return null;
  if (ex.backoff.percentRm == null) return ex.backoff.refKg;
  const base = baseWeight(ex.name, p);
  if (base == null) return ex.backoff.refKg;
  return round25(base * ex.backoff.percentRm);
}
