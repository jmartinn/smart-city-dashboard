import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMockData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    date: new Date(2023, 0, 1 + i).toISOString().split('T')[0],
    consumption: Math.floor(Math.random() * 500) + 1000,
    production: Math.floor(Math.random() * 500) + 900,
    emissions: Math.floor(Math.random() * 200) + 400,
  }));
}
