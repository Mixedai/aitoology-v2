export function displayBool(v?: boolean): string {
  return typeof v === 'boolean' ? (v ? 'Yes' : 'No') : '—';
}

export function displayNumber(v?: number, unit?: string): string {
  if (v == null || Number.isNaN(v)) return '—';
  const s = Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
  return unit ? `${s} ${unit}` : s;
}

export function equalish(a: any, b: any): boolean {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 0.05;
  }
  return String(a ?? '').trim().toLowerCase() === String(b ?? '').trim().toLowerCase();
}