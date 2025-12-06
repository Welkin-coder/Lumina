export enum Dimension {
  EI = 'EI', // Extraversion vs Introversion
  SN = 'SN', // Sensing vs Intuition
  TF = 'TF', // Thinking vs Feeling
  JP = 'JP', // Judging vs Perceiving
}

export enum DimensionValue {
  E = 'E',
  I = 'I',
  S = 'S',
  N = 'N',
  T = 'T',
  F = 'F',
  J = 'J',
  P = 'P',
}

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  // If true, a high score (5) means the first letter (E, S, T, J).
  // If false, a high score (5) means the second letter (I, N, F, P).
  // Wait, let's make it explicit.
  // direction: 'Positive' means 5 = First Letter (E/S/T/J).
  // direction: 'Negative' means 5 = Second Letter (I/N/F/P).
  direction: 'Positive' | 'Negative'; 
}

export interface Answer {
  questionId: number;
  value: number; // 1 to 5
}

export interface MBTIResult {
  type: string; // e.g., "INTJ"
  scores: {
    [key in Dimension]: {
      label: string;
      score: number; // Percentage or raw score favoring the first letter
      dominant: DimensionValue;
    };
  };
}

export interface MBTIStaticInfo {
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
}
