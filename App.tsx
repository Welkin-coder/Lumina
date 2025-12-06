import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { TestPage } from './components/TestPage';
import { ResultsPage } from './components/ResultsPage';
import { Answer, MBTIResult, Dimension, DimensionValue } from './types';
import { QUESTIONS } from './constants';

enum AppView {
  LANDING = 'LANDING',
  TEST = 'TEST',
  RESULTS = 'RESULTS'
}

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [result, setResult] = useState<MBTIResult | null>(null);

  const calculateResult = (answers: Answer[]): MBTIResult => {
    // Initialize scores
    const rawScores = {
      [Dimension.EI]: 0,
      [Dimension.SN]: 0,
      [Dimension.TF]: 0,
      [Dimension.JP]: 0
    };

    const maxScores = {
      [Dimension.EI]: 0,
      [Dimension.SN]: 0,
      [Dimension.TF]: 0,
      [Dimension.JP]: 0
    };

    answers.forEach(ans => {
      const q = QUESTIONS.find(q => q.id === ans.questionId);
      if (!q) return;

      maxScores[q.dimension] += 5;

      // Logic: 
      // Direction Positive: 5 supports 1st letter (E, S, T, J)
      // Direction Negative: 5 supports 2nd letter (I, N, F, P) -> 1 supports 1st letter
      
      let pointsForFirstLetter = 0;
      if (q.direction === 'Positive') {
        pointsForFirstLetter = ans.value;
      } else {
        // Reverse score: 1->5, 2->4, 3->3, 4->2, 5->1
        pointsForFirstLetter = 6 - ans.value;
      }

      rawScores[q.dimension] += pointsForFirstLetter;
    });

    // Determine type
    const determineLetter = (dim: Dimension, score: number, max: number) => {
      const percentage = (score / max) * 100;
      // If > 50%, it's the first letter (E, S, T, J). Else second.
      // E.g. EI: >50% is E.
      
      let letter: DimensionValue;
      let label = "";
      
      switch(dim) {
        case Dimension.EI:
            letter = percentage >= 50 ? DimensionValue.E : DimensionValue.I;
            label = "Mind";
            break;
        case Dimension.SN:
            letter = percentage >= 50 ? DimensionValue.S : DimensionValue.N;
            label = "Energy";
            break;
        case Dimension.TF:
            letter = percentage >= 50 ? DimensionValue.T : DimensionValue.F;
            label = "Nature";
            break;
        case Dimension.JP:
            letter = percentage >= 50 ? DimensionValue.J : DimensionValue.P;
            label = "Tactics";
            break;
      }

      return {
        letter,
        score: percentage, // This is always "Percent match for First Letter"
        label
      };
    };

    const eI = determineLetter(Dimension.EI, rawScores[Dimension.EI], maxScores[Dimension.EI]);
    const sN = determineLetter(Dimension.SN, rawScores[Dimension.SN], maxScores[Dimension.SN]);
    const tF = determineLetter(Dimension.TF, rawScores[Dimension.TF], maxScores[Dimension.TF]);
    const jP = determineLetter(Dimension.JP, rawScores[Dimension.JP], maxScores[Dimension.JP]);

    const typeStr = `${eI.letter}${sN.letter}${tF.letter}${jP.letter}`;

    return {
      type: typeStr,
      scores: {
        [Dimension.EI]: { label: "Extraverted", score: eI.score, dominant: eI.letter },
        [Dimension.SN]: { label: "Observant", score: sN.score, dominant: sN.letter },
        [Dimension.TF]: { label: "Thinking", score: tF.score, dominant: tF.letter },
        [Dimension.JP]: { label: "Judging", score: jP.score, dominant: jP.letter },
      }
    };
  };

  const handleComplete = (answers: Answer[]) => {
    const calculatedResult = calculateResult(answers);
    setResult(calculatedResult);
    localStorage.removeItem('lumina_answers');
    localStorage.removeItem('lumina_index');
    setView(AppView.RESULTS);
    window.scrollTo(0,0);
  };

  return (
    <>
      {view === AppView.LANDING && (
        <LandingPage onStart={() => setView(AppView.TEST)} />
      )}
      {view === AppView.TEST && (
        <TestPage 
          onComplete={handleComplete} 
          onExit={() => setView(AppView.LANDING)} 
        />
      )}
      {view === AppView.RESULTS && result && (
        <ResultsPage 
          result={result} 
          onRetake={() => {
            setResult(null);
            setView(AppView.LANDING);
          }} 
        />
      )}
    </>
  );
};

export default App;
