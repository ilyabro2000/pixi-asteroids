export const randomColor = (random = Math.random): number => {
  const r = Math.floor(0xff * random());
  const g = Math.floor(0xff * random());
  const b = Math.floor(0xff * random());
  // eslint-disable-next-line no-bitwise
  return (r << 16) | (g << 8) | b;
};

export const randomRange = (min: number, max: number, random = Math.random): number => {
  const a = Math.min(min, max);
  const b = Math.max(min, max);

  return a + (b - a) * random();
};

export const randomItem = <T>(obj: T, random = Math.random): T[keyof T] => {
  if (Array.isArray(obj)) {
    return obj[Math.floor(random() * obj.length)];
  }

  const keys = Object.keys(obj as Record<string, unknown>);
  const key = keys[Math.floor(random() * keys.length)];
  return obj[key as keyof T];
};

export const randomItems = <T>(obj: T, count: number, random = Math.random): T[keyof T][] => {
  const originalItems = Array.isArray(obj)
    ? [...obj]
    : Object.values(obj as Record<string, unknown>);

  const result: T[keyof T][] = [];

  while (result.length < count && originalItems.length > 0) {
    const index = Math.floor(random() * originalItems.length);
    const item = originalItems.splice(index, 1)[0];
    result.push(item as T[keyof T]);
  }

  return result;
};

export const randomBool = (weight = 0.5, random = Math.random): boolean => random() < weight;
