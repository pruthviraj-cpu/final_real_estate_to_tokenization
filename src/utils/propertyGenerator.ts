const generateCombination = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  
  const firstTwo = Array(2).fill(0)
    .map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  
  const nextTwo = Array(2).fill(0)
    .map(() => digits[Math.floor(Math.random() * digits.length)]).join('');
  
  const lastTwo = Array(2).fill(0)
    .map(() => {
      const allChars = chars + digits;
      return allChars[Math.floor(Math.random() * allChars.length)];
    }).join('');
  
  return firstTwo + nextTwo + lastTwo;
};

export const generateMultipleCombinations = (count: number): string[] => {
  const combinations = new Set<string>();
  while (combinations.size < count) {
    combinations.add(generateCombination());
  }
  return Array.from(combinations);
};