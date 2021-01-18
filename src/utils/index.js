/**
 * Equation from https://dsp.stackexchange.com/a/56529
 * Visualized here https://www.desmos.com/calculator/uakymahh4u
 *
 * @param t
 * @param delta
 * @param a
 * @param f
 * @returns {number}
 */
export const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);
};
