import { Dimension, Question, MBTIStaticInfo } from './types';

// E/I, S/N, T/F, J/P
// Positive Direction: E, S, T, J
// Negative Direction: I, N, F, P

export const QUESTIONS: Question[] = [
  // A. Social Energy & Interaction (I vs E)
  { id: 1, text: "You enjoy being the center of attention in social situations.", dimension: Dimension.EI, direction: 'Positive' },
  { id: 2, text: "You feel energized after spending time with other people.", dimension: Dimension.EI, direction: 'Positive' },
  { id: 3, text: "You often start conversations with people you don’t know well.", dimension: Dimension.EI, direction: 'Positive' },
  { id: 4, text: "You prefer group activities over spending time alone.", dimension: Dimension.EI, direction: 'Positive' },
  { id: 5, text: "You find it easy to approach someone first when needed.", dimension: Dimension.EI, direction: 'Positive' },
  { id: 6, text: "Social events usually excite you rather than drain you.", dimension: Dimension.EI, direction: 'Positive' },
  { id: 7, text: "You express your thoughts out loud more easily than thinking silently.", dimension: Dimension.EI, direction: 'Positive' },
  { id: 8, text: "You prefer staying home to going out, even when you have free time.", dimension: Dimension.EI, direction: 'Negative' },

  // B. Information Processing (S vs N)
  { id: 9, text: "You focus more on concrete details than abstract ideas.", dimension: Dimension.SN, direction: 'Positive' },
  { id: 10, text: "You trust proven methods more than new, untested ones.", dimension: Dimension.SN, direction: 'Positive' },
  { id: 11, text: "You enjoy working with real facts rather than theories.", dimension: Dimension.SN, direction: 'Positive' },
  { id: 12, text: "You notice small details that others often miss.", dimension: Dimension.SN, direction: 'Positive' },
  { id: 13, text: "You prefer step-by-step instructions over figuring things out creatively.", dimension: Dimension.SN, direction: 'Positive' },
  { id: 14, text: "You think about future possibilities more than present realities.", dimension: Dimension.SN, direction: 'Negative' },
  { id: 15, text: "You often look for patterns or deeper meanings in events.", dimension: Dimension.SN, direction: 'Negative' },
  { id: 16, text: "You enjoy brainstorming imaginative ideas even without practical use.", dimension: Dimension.SN, direction: 'Negative' },

  // C. Decision-Making Style (T vs F)
  { id: 17, text: "You base decisions on logic rather than personal feelings.", dimension: Dimension.TF, direction: 'Positive' },
  { id: 18, text: "You stay calm and objective during discussions or debates.", dimension: Dimension.TF, direction: 'Positive' },
  { id: 19, text: "You prefer honesty even if the truth might hurt someone.", dimension: Dimension.TF, direction: 'Positive' },
  { id: 20, text: "You consider other people's emotions more than your own judgment.", dimension: Dimension.TF, direction: 'Negative' },
  { id: 21, text: "You value harmony and avoid conflict whenever possible.", dimension: Dimension.TF, direction: 'Negative' },
  { id: 22, text: "You enjoy analyzing problems more than comforting others.", dimension: Dimension.TF, direction: 'Positive' },
  { id: 23, text: "You believe fairness is more important than pleasing people.", dimension: Dimension.TF, direction: 'Positive' },
  { id: 24, text: "You adjust your decisions if they might negatively impact someone emotionally.", dimension: Dimension.TF, direction: 'Negative' },

  // D. Lifestyle & Organization (J vs P)
  { id: 25, text: "You like having a detailed plan before starting a task.", dimension: Dimension.JP, direction: 'Positive' },
  { id: 26, text: "You feel uncomfortable when things are unorganized or uncertain.", dimension: Dimension.JP, direction: 'Positive' },
  { id: 27, text: "You prefer finishing tasks early rather than close to the deadline.", dimension: Dimension.JP, direction: 'Positive' },
  { id: 28, text: "You enjoy having routines and structured schedules.", dimension: Dimension.JP, direction: 'Positive' },
  { id: 29, text: "You often make decisions quickly instead of waiting for more options.", dimension: Dimension.JP, direction: 'Positive' },
  { id: 30, text: "You prefer keeping your environment neat and tidy.", dimension: Dimension.JP, direction: 'Positive' },
  { id: 31, text: "You enjoy being flexible and adapting as things change.", dimension: Dimension.JP, direction: 'Negative' },
  { id: 32, text: "You feel restricted when you must follow strict rules or schedules.", dimension: Dimension.JP, direction: 'Negative' },

  // E. Additional Accuracy-Boosting Questions (Mapped to Dimensions)
  { id: 33, text: "You enjoy deep, philosophical conversations.", dimension: Dimension.SN, direction: 'Negative' }, // N
  { id: 34, text: "You prefer practical solutions over creative ones.", dimension: Dimension.SN, direction: 'Positive' }, // S
  { id: 35, text: "You often replay social interactions in your mind to analyze them.", dimension: Dimension.EI, direction: 'Negative' }, // Introverted tendency to ruminate
  { id: 36, text: "You get frustrated when plans suddenly change.", dimension: Dimension.JP, direction: 'Positive' }, // J
  { id: 37, text: "You rely on intuition more than evidence when making predictions.", dimension: Dimension.SN, direction: 'Negative' }, // N
  { id: 38, text: "You like exploring new experiences rather than sticking to what you know.", dimension: Dimension.JP, direction: 'Negative' }, // P (Openness often correlates with P/N, mapping to P for balance)
  { id: 39, text: "You think feelings can cloud judgment in important decisions.", dimension: Dimension.TF, direction: 'Positive' }, // T
  { id: 40, text: "You often think about how others might view your actions.", dimension: Dimension.TF, direction: 'Negative' }, // F (Fe)
];

export const MBTI_DESCRIPTIONS: Record<string, MBTIStaticInfo> = {
  "DEFAULT": {
    title: "The Strategist",
    description: "You are an analytical problem-solver who values precision and logic. You see the world as a system of interconnected parts and constantly seek to improve efficiency.",
    strengths: ["Strategic Thinking", "Objectivity", "Independence", "Reliability"],
    weaknesses: ["Over-analytical", "Insensitive to Emotion", "Perfectionist", "Private"],
    careers: ["Software Engineering", "Architecture", "Financial Analysis", "Research"]
  }
};
