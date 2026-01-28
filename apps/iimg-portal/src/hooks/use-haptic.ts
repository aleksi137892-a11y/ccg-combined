export const useHaptic = () => {
  const vibrate = (pattern: number | number[] = 10) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const light = () => vibrate(10);
  const medium = () => vibrate(20);
  const heavy = () => vibrate(30);
  const success = () => vibrate([10, 50, 20]);
  const error = () => vibrate([30, 50, 30, 50, 30]);

  return { vibrate, light, medium, heavy, success, error };
};
