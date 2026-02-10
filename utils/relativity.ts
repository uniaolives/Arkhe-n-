
export const C = 1.0; // Natural units

export const getLorentzFactor = (v: number) => {
  return 1 / Math.sqrt(1 - Math.pow(v / C, 2));
};

export const transformTime = (t: number, x: number, v: number) => {
  const gamma = getLorentzFactor(v);
  return gamma * (t - (v * x) / Math.pow(C, 2));
};

export const transformSpace = (t: number, x: number, v: number) => {
  const gamma = getLorentzFactor(v);
  return gamma * (x - v * t);
};

// Hexagon vertices in (x, y) coordinates
export const SCHMIDT_VERTICES = [
  { id: 1, x: 1, y: 0 },
  { id: 2, x: 0.5, y: 0.866 },
  { id: 3, x: -0.5, y: 0.866 },
  { id: 4, x: -1, y: 0 },
  { id: 5, x: -0.5, y: -0.866 },
  { id: 6, x: 0.5, y: -0.866 },
];

export const compactify = (t: number, r: number) => {
  const Tp = Math.atan(t + r) + Math.atan(t - r);
  const Rp = Math.atan(t + r) - Math.atan(t - r);
  return { Tp, Rp };
};
